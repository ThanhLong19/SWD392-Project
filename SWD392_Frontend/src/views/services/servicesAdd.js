import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CFormSelect,
  CFormCheck,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from 'src/services/api.services'

const ServiceAdd = () => {
  const [validate, setValidate] = useState(false)
  const [serviceName, setServiceName] = useState('')
  const [serviceDesc, setServiceDesc] = useState('')
  const [status, setStatus] = useState(true)
  const [href, setHref] = useState('')
  const [type, setType] = useState(1)

  const [toast, setToast] = useState(0)
  const toaster = useRef()

  const navigate = useNavigate()
  const addToast = (title, message) => (
    <CToast animation={true} autohide={true} delay={2000}>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">{title}</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  const handleValidateBeforeSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setToast(addToast('Add Services', 'Please fill all the fields'))
      e.stopPropagation()
    } else {
      await instance
        .post('services/add', {
          serviceName,
          detail: serviceDesc,
          price: href,
          status: status ? 1 : 0,
          type,
        })
        .then((response) => {
          setToast(addToast('Add Service', 'success'))
        })
        .catch((error) => {
          setToast(addToast('Add Service', 'falied'))
        })
      setTimeout(() => {
        navigate('/services')
      }, 2000)
    }
    setValidate(true)
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <h1>Add new service</h1>
      <CForm
        className="row g-3"
        validated={validate}
        noValidate
        onSubmit={handleValidateBeforeSubmit}
      >
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputServiceName4"
            label="Service name"
            feedbackInvalid="Please fill in service name."
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputServiceDesc4"
            label="Service description"
            onChange={(e) => {
              setServiceDesc(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in service description."
          />
        </CCol>
        <CCol xs={4}>
          <CFormInput
            type="number"
            id="inputHref4"
            label="Price"
            onChange={(e) => {
              setHref(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in price."
          />
        </CCol>
        <CCol xs={4}>
          <CFormInput
            type="text"
            id="inputType"
            label="Type"
            onChange={(e) => {
              setType(e.target.value)
            }}
          ></CFormInput>
        </CCol>
        <CCol xs={4}>
          <CFormCheck
            type="checkbox"
            id="gridCheck"
            label="Set Active"
            defaultChecked={status}
            onClick={() => {
              setStatus(!status)
            }}
          />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Add Service</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default ServiceAdd

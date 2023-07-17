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

const SettingAdd = () => {
  const [validate, setValidate] = useState(false)
  const [settingName, setSettingName] = useState('')
  const [settingDesc, setSettingDesc] = useState('')
  const [status, setStatus] = useState(true)
  const [href, setHref] = useState('')
  const [type, setType] = useState(1)
  const [listType, setListType] = useState([])

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

  useEffect(() => {
    const fetchType = async () => {
      instance
        .get('types/all')
        .then((response) => {
          setListType(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchType()
  }, [setListType])

  const handleValidateBeforeSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setToast(addToast('Add Settings', 'Please fill all the fields'))
      e.stopPropagation()
    } else {
      await instance
        .post('settings/add', {
          value: settingName,
          description: settingDesc,
          href,
          status,
          typeId: type,
        })
        .then((response) => {
          setToast(addToast('Add Setting', 'success'))
        })
        .catch((error) => {
          setToast(addToast('Add Setting', 'falied'))
        })
      setTimeout(() => {
        navigate('/settings')
      }, 2000)
    }
    setValidate(true)
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <h1>Add new setting</h1>
      <CForm
        className="row g-3"
        validated={validate}
        noValidate
        onSubmit={handleValidateBeforeSubmit}
      >
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputSettingName4"
            label="Setting name"
            feedbackInvalid="Please fill in setting name."
            onChange={(e) => setSettingName(e.target.value)}
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputSettingDesc4"
            label="Setting description"
            onChange={(e) => {
              setSettingDesc(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in setting description."
          />
        </CCol>
        <CCol md={12}>
          <CFormInput
            type="text"
            id="inputHref4"
            label="Link to reference"
            onChange={(e) => {
              setHref(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in reference."
          />
        </CCol>
        <CCol xs={6}>
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
        <CCol xs={6}>
          <CFormSelect
            id="inputType"
            label="Type"
            onChange={(e) => {
              setType(e.target.value)
            }}
          >
            {listType.map((element) => (
              <option key={element.typeId} value={element.typeId}>
                {element.typeName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Add Setting</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default SettingAdd

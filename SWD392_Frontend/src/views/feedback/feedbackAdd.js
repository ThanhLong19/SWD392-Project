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

const PostAdd = () => {
  const [validate, setValidate] = useState(false)
  const [feedbackDetail, setFeedbackDetail] = useState('')
  const [postContent, setPostContent] = useState('')
  const [status, setStatus] = useState(true)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [user, setUser] = useState(1)
  const [reservation, setReservation] = useState(1)
  const [star, setStar] = useState(0)
  const [listUser, setListUser] = useState([])
  const [listReservation, setListReservation] = useState([])

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
        .get('users/all')
        .then((response) => {
          setListUser(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    const fetchReservation = async () => {
      instance
        .get('reservation/all')
        .then((response) => {
          setListReservation(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchType()
    fetchReservation()
  }, [setListUser, setListReservation])

  const handleValidateBeforeSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setToast(addToast('Add Post', 'Please fill all the fields'))
      e.stopPropagation()
    } else {
      await instance
        .post('feedback/add', {
          detail: feedbackDetail,
          star,
          feedbackStatus: status ? 1 : 0,
          userId: user,
          reservationId: reservation,
        })
        .then((response) => {
          setToast(addToast('Add Post', 'success'))
        })
        .catch((error) => {
          setToast(addToast('Add Post', 'falied'))
        })
      setTimeout(() => {
        navigate('/feedback')
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
            label="Feedback content"
            feedbackInvalid="Please fill in feedback content."
            onChange={(e) => setFeedbackDetail(e.target.value)}
            required
          />
        </CCol>
        <CCol md={12}>
          <CFormInput
            type="number"
            id="inputHref4"
            label="Star"
            onChange={(e) => {
              setStar(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in star."
          />
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
        <CCol xs={4}>
          <CFormSelect
            id="inputType"
            label="By"
            onChange={(e) => {
              setUser(e.target.value)
            }}
          >
            {listUser.map((element) => (
              <option key={element.userId} value={element.userId}>
                {element.fullName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol xs={4}>
          <CFormSelect
            id="inputReservation"
            label="For service"
            onChange={(e) => {
              setReservation(e.target.value)
            }}
          >
            {listReservation.map((element) => (
              <option key={element.reservationId} value={element.reservationId}>
                {element.reservationDetails[0].service.serviceName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Add Post</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default PostAdd

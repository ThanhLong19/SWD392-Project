import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const API_URL = 'http://localhost:5175/api/'
  const [email, setEmail] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [finalStatus, setFinalStatus] = useState({ status: false, message: '' })

  const handleEmailFieldChange = (e) => {
    setEmail(e.target.value)
  }

  const handleRecoverPasswordButtonClicked = (e) => {
    axios
      .post(API_URL + 'recoverPassword', {
        email,
      })
      .then((response) => {
        setFinalStatus({ status: true, message: 'Success' })
        setModalVisible(true)
      })
      .catch((error) => {
        setFinalStatus({ status: false, message: 'Failed' })
        setModalVisible(true)
      })
  }
  const navigate = useNavigate()

  const handleOnCloseModel = () => {
    setModalVisible(false)
    navigate('/login')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {modalVisible && (
        <CModal visible="true" backdrop="static" alignment="center" onClose={handleOnCloseModel}>
          <CModalHeader>
            <CModalTitle>Recover Status</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>{finalStatus.message}</p>
          </CModalBody>
          <CModalFooter>
            <CButton
              className={finalStatus.status ? 'success' : 'secondary'}
              onClick={handleOnCloseModel}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Forgot Password</h1>
                  <p className="text-medium-emphasis">Get new password when you lost it!</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      onChange={handleEmailFieldChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRecoverPasswordButtonClicked}>
                      Recover password
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword

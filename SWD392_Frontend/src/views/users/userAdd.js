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

const UserAdd = () => {
  const [validate, setValidate] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState(1)
  const [role, setRole] = useState(1)
  const [status, setStatus] = useState(true)
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [listRole, setListRole] = useState([])

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
    const fetchRole = async () => {
      instance
        .get('/role/getAll')
        .then((response) => {
          setListRole(response.data)
        })
        .catch((error) => {
          console.log('error')
        })
    }
    fetchRole()
  }, [setListRole])

  const handleOnChangeGender = (e) => {
    setGender(parseInt(e.target.value))
  }

  const handleValidateBeforeSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setToast(addToast('Add User', 'Please fill all the fields'))
      e.stopPropagation()
    } else {
      await instance
        .post('users/add', {
          userName,
          password,
          phone,
          roleId: role,
          address,
          fullName,
          email,
          gender,
          status: status ? 1 : 0,
        })
        .then((response) => {
          setToast(addToast('Add User', 'success'))
        })
        .catch((error) => {
          setToast(addToast('Add User', 'falied'))
        })
      setTimeout(() => {
        navigate('/users')
      }, 2000)
    }
    setValidate(true)
  }
  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <h1>Add new user</h1>
      <CForm
        className="row g-3"
        validated={validate}
        noValidate
        onSubmit={handleValidateBeforeSubmit}
      >
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputUserName4"
            label="User name"
            feedbackInvalid="Please fill in user name."
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="password"
            id="inputPassword4"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in password."
          />
        </CCol>
        <CCol md={12}>
          <CFormInput
            type="email"
            id="inputEmail4"
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in email."
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="fullName"
            label="Full Name"
            onChange={(e) => {
              setFullName(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in full name."
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="inputAddress"
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
            feedbackInvalid="Please fill in address."
          />
        </CCol>
        <CCol xs={12}>
          <CFormInput
            id="inputPhone"
            label="Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
            feedbackInvalid="Please fill in phone."
          />
        </CCol>
        <CCol md={4}>
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <CFormCheck
            type="radio"
            name="gridRadios"
            id="gridRadios1"
            value={1}
            label="Male"
            checked={gender === 1}
            onChange={handleOnChangeGender}
          />
          <CFormCheck
            type="radio"
            name="gridRadios"
            id="gridRadios2"
            value={2}
            label="Female"
            checked={gender === 2}
            onChange={handleOnChangeGender}
          />
        </CCol>
        <CCol md={8}>
          <CFormSelect
            id="inputRole"
            label="Role"
            onChange={(e) => {
              setRole(e.target.value)
            }}
          >
            {listRole.map((element) => (
              <option key={element.roleId} value={element.roleId}>
                {element.roleName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol xs={12}>
          <CFormCheck
            type="checkbox"
            label="Set Active"
            defaultChecked={status}
            onClick={() => {
              setStatus(!status)
            }}
          />
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Add User</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default UserAdd

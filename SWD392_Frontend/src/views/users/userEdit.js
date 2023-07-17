import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCol,
  CFormCheck,
  CButton,
  CFormSelect,
} from '@coreui/react'
import instance from 'src/services/api.services'

const UserEdit = () => {
  const param = useParams()
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState(1)
  const [role, setRole] = useState(1)
  const [status, setStatus] = useState(1)
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [listRole, setListRole] = useState([])
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
    const fetchData = async () => {
      instance
        .get('/users/getUserById?id=' + param.id)
        .then((response) => {
          const data = response.data
          setUserId(data.userId)
          setUserName(data.userName)
          setPassword(data.password)
          setGender(data.gender)
          setFullName(data.fullName)
          setPhone(data.phone)
          setRole(data.roleId)
          setStatus(data.status)
          setEmail(data.email)
          setAddress(data.address)
        })
        .catch((error) => {
          console.log('error')
        })
    }
    fetchRole()
    fetchData()
  }, [param.id])

  const handleOnChangeGender = (e) => {
    setGender(parseInt(e.target.value))
  }

  const handleOnChangeRole = (e) => {
    setRole(e.target.value)
  }

  const handleOnChangeStatus = (value) => {
    console.log(value.target.checked)
    setStatus(value.target.checked ? 1 : 0)
  }

  const navigate = useNavigate()

  const handleOnClickSaveUser = async (e) => {
    e.preventDefault()
    instance
      .patch('users/update', {
        userId,
        userName,
        password,
        email,
        roleId: role,
        gender,
        fullName,
        phone,
        address,
        status,
      })
      .then((response) => {
        navigate('/users')
      })
      .catch((error) => {
        console.log(error.status)
        navigate('/users')
      })
  }

  return (
    <>
      <h1>Edit User</h1>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUserName" className="col-sm-2 col-form-label">
            User Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputUserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="email"
              id="inputEmail3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="password"
              id="inputPassword3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputPhone3" className="col-sm-2 col-form-label">
            Phone
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="phone"
              id="inputPhone3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputFullName3" className="col-sm-2 col-form-label">
            Full Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputFullName3"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </CCol>
        </CRow>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <CCol sm={10}>
            <CFormCheck
              inline
              type="radio"
              name="gridRadios"
              id="gridRadios1"
              value={1}
              label="Male"
              checked={gender === 1}
              onChange={handleOnChangeGender}
            />
            <CFormCheck
              inline
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value={2}
              label="Female"
              checked={gender === 2}
              onChange={handleOnChangeGender}
            />
          </CCol>
        </fieldset>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Address
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Role
          </CFormLabel>
          <CCol sm={10}>
            <CFormSelect value={role} onChange={handleOnChangeRole}>
              {listRole.map((element) => (
                <option key={element.roleId} value={element.roleId}>
                  {element.roleName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputStatus" className="col-sm-2 col-form-label">
            Status
          </CFormLabel>
          <CCol sm={10}>
            <CFormCheck
              inline
              id="inputStatus"
              checked={status === 1}
              onChange={handleOnChangeStatus}
            />
          </CCol>
        </CRow>
        <CButton type="button" onClick={handleOnClickSaveUser}>
          Save
        </CButton>
      </CForm>
    </>
  )
}
export default UserEdit

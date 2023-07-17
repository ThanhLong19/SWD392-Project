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
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [status, setStatus] = useState(true)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [user, setUser] = useState(1)
  const [category, setCategory] = useState('')
  const [listUser, setListUser] = useState([])

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
    fetchType()
  }, [setListUser])

  const handleValidateBeforeSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setToast(addToast('Add Post', 'Please fill all the fields'))
      e.stopPropagation()
    } else {
      await instance
        .post('posts/add', {
          title: postTitle,
          content: postContent,
          category,
          status: status ? 1 : 0,
          userId: user,
          date,
        })
        .then((response) => {
          setToast(addToast('Add Post', 'success'))
        })
        .catch((error) => {
          setToast(addToast('Add Post', 'falied'))
        })
      setTimeout(() => {
        navigate('/posts')
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
            label="Post title"
            feedbackInvalid="Please fill in post title."
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </CCol>
        <CCol md={6}>
          <CFormInput
            type="text"
            id="inputSettingDesc4"
            label="Post content"
            onChange={(e) => {
              setPostContent(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in setting description."
          />
        </CCol>
        <CCol md={12}>
          <CFormInput
            type="text"
            id="inputHref4"
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            required
            feedbackInvalid="Please fill in category."
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
          <CFormInput
            id="inputDate"
            label="Date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            onChange={(e) => {
              console.log(e.target.value)
              setDate(e.target.value)
            }}
          ></CFormInput>
        </CCol>
        <CCol xs={12}>
          <CButton type="submit">Add Post</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default PostAdd

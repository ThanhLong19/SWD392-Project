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
  const [postId, setPostId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [status, setStatus] = useState(1)
  const [userId, setUserId] = useState(-1)

  const [listUser, setListUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      instance
        .get('/users/all')
        .then((response) => {
          setListUser(response.data)
        })
        .catch((error) => {
          console.log('error')
        })
    }
    const fetchData = async () => {
      instance
        .get('/posts/getPostById?id=' + param.id)
        .then((response) => {
          const data = response.data
          setPostId(data.postId)
          setTitle(data.title)
          setContent(data.content)
          setDate(data.date.substring(0, 10))
          setCategory(data.category)
          setStatus(data.status)
          setUserId(data.userId)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchUser()
    fetchData()
  }, [param.id])

  const handleOnChangeStatus = (value) => {
    console.log(value.target.checked)
    setStatus(value.target.checked ? 1 : 0)
  }

  const navigate = useNavigate()

  const handleOnClickSavePost = async (e) => {
    e.preventDefault()
    instance
      .patch('posts/update', {
        postId,
        title,
        content,
        date,
        category,
        status,
        userId,
      })
      .then((response) => {
        navigate('/posts')
      })
      .catch((error) => {
        console.log(error.status)
        navigate('/posts')
      })
  }

  return (
    <>
      <h1>Edit Post</h1>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUserName" className="col-sm-2 col-form-label">
            Title
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Category
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputEmail3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Content
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputPassword3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputPhone3" className="col-sm-2 col-form-label">
            Date
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="date"
              id="inputPhone3"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUser" className="col-sm-2 col-form-label">
            By user
          </CFormLabel>
          <CCol sm={10}>
            <CFormSelect
              value={userId}
              onChange={(e) => {
                setUserId(parseInt(e.target.value))
              }}
            >
              {listUser.map((element) => (
                <option key={element.userId} value={element.userId}>
                  {element.fullName}
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
        <CButton type="button" onClick={handleOnClickSavePost}>
          Save
        </CButton>
      </CForm>
    </>
  )
}
export default UserEdit

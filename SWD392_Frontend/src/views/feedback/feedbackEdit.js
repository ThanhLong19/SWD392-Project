import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CForm, CFormInput, CRow, CFormLabel, CCol, CButton } from '@coreui/react'
import instance from 'src/services/api.services'

const UserEdit = () => {
  const param = useParams()
  const [feedbackId, setFeedbackId] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      instance
        .get('/feedback/getFeedbackById?id=' + param.id)
        .then((response) => {
          const data = response.data
          setFeedbackId(data.feedbackId)
          setContent(data.content)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchData()
  }, [param.id])

  const navigate = useNavigate()

  const handleOnClickSavePost = async (e) => {
    e.preventDefault()
    instance
      .patch('feedback/update', {
        feedbackId,
        content,
      })
      .then((response) => {
        navigate('/feedback')
      })
      .catch((error) => {
        console.log(error.status)
        navigate('/feedback')
      })
  }

  return (
    <>
      <h1>Edit Feedback</h1>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUserName" className="col-sm-2 col-form-label">
            Content
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputTitle"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

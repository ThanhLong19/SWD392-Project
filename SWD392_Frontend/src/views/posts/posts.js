import {
  CTable,
  CButton,
  CToast,
  CToastBody,
  CToastHeader,
  CModal,
  CToaster,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import instance from 'src/services/api.services'

const Posts = () => {
  const [postsList, setPostsList] = useState([])
  const [postId, setPostId] = useState(-1)
  const [modalVisible, setModalVisible] = useState(false)
  const [toast, setToast] = useState(0)
  const toaster = useRef()
  const addToast = (title, message) => (
    <CToast animation={true} autohide={true} delay={2000}>
      <CToastHeader closeButton>
        <strong className="me-auto">{title}</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
  const postTableColumn = [
    {
      key: 'postId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'title',
      label: 'Title',
      _props: { scope: 'col' },
    },
    {
      key: 'content',
      _props: { scope: 'col' },
    },
    {
      key: 'userId',
      label: 'By',
      _props: { scope: 'col' },
    },
    {
      key: 'date',
      label: 'Date',
      _props: { scope: 'col' },
    },
    {
      key: 'category',
      label: 'Category',
      _props: { scope: 'col' },
    },
    {
      key: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const onHandleClickDeleteButtton = (e) => {
    setPostId(e.target.value)
    setModalVisible(true)
  }

  useEffect(() => {
    const posts = async () => {
      instance
        .get('/posts/all')
        .then((response) => {
          console.log(response.data)
          const data = response.data
          data.forEach((element) => {
            element['content'] =
              element.content.length > 100
                ? element.content.substring(0, 100) + '...'
                : element.content
            element['userId'] = element.user.fullName
            element['date'] = element.date.substring(0, 10)
            element['Action'] = (
              <>
                <Link to={'edit/' + element.postId}>
                  <CButton value={element.postId}>Edit</CButton>
                </Link>
                <CButton value={element.postId} onClick={onHandleClickDeleteButtton}>
                  Delete
                </CButton>
              </>
            )
          })
          setPostsList(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    posts()
  }, [])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <CModal backdrop="static" visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Delete post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are you sure you want to delete this?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="danger"
            onClick={async () => {
              await instance
                .delete(`posts/delete?id=${postId}`)
                .then(async (response) => {
                  setToast(addToast('Delete Post', 'Delete post successfully.'))
                  await instance
                    .get('/posts/all')
                    .then((response) => {
                      console.log(response.data)
                      const data = response.data
                      data.forEach((element) => {
                        element['content'] =
                          element.content.length > 100
                            ? element.content.substring(0, 100) + '...'
                            : element.content
                        element['userId'] = element.user.fullName
                        element['Action'] = (
                          <>
                            <Link to={'edit/' + element.postId}>
                              <CButton value={element.postId}>Edit</CButton>
                            </Link>
                            <CButton value={element.postId} onClick={onHandleClickDeleteButtton}>
                              Delete
                            </CButton>
                          </>
                        )
                      })
                      setPostsList(data)
                    })
                    .catch((error) => {
                      console.log(error)
                      setPostsList([])
                    })
                })
                .catch((error) => {
                  console.log(error)
                  setToast(addToast('Delete Post', 'Delete post failed.'))
                })
              setModalVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <h1>Post List</h1>
      <Link to="add">
        <CButton color="primary">Add new post</CButton>
      </Link>
      <CTable columns={postTableColumn} items={postsList}></CTable>
    </>
  )
}

export default Posts

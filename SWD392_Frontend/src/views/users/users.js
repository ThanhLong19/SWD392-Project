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

const Users = () => {
  const [usersList, setUsersList] = useState([])
  const [userId, setUserId] = useState(-1)
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
  const userTableColumn = [
    {
      key: 'userId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'fullName',
      label: 'Full Name',
      _props: { scope: 'col' },
    },
    {
      key: 'address',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      _props: { scope: 'col' },
    },
    {
      key: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const onHandleClickDeleteButtton = (e) => {
    setUserId(e.target.value)
    setModalVisible(true)
  }

  useEffect(() => {
    const users = async () => {
      instance
        .get('/users/all')
        .then((response) => {
          console.log(response.data)
          const data = response.data
          data.forEach((element) => {
            element['Action'] = (
              <>
                <Link to={'edit/' + element.userId}>
                  <CButton value={element.userId}>Edit</CButton>
                </Link>
                <CButton value={element.userId} onClick={onHandleClickDeleteButtton}>
                  Delete
                </CButton>
              </>
            )
          })
          setUsersList(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    users()
  }, [])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <CModal backdrop="static" visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Delete user</CModalTitle>
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
                .delete(`users/delete?id=${userId}`)
                .then(async (response) => {
                  setToast(addToast('Delete User', 'Delete user successfully.'))
                  await instance
                    .get('/users/all')
                    .then((response) => {
                      console.log(response.data)
                      const data = response.data
                      data.forEach((element) => {
                        element['Action'] = (
                          <>
                            <Link to={'edit/' + element.userId}>
                              <CButton value={element.userId}>Edit</CButton>
                            </Link>
                            <CButton value={element.settingId} onClick={onHandleClickDeleteButtton}>
                              Delete
                            </CButton>
                          </>
                        )
                      })
                      setUsersList(data)
                    })
                    .catch((error) => {
                      console.log(error)
                      setUsersList([])
                    })
                })
                .catch((error) => {
                  console.log(error)
                  setToast(addToast('Delete User', 'Delete user failed.'))
                })
              setModalVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <h1>User List</h1>
      <Link to="add">
        <CButton color="primary">Add new user</CButton>
      </Link>
      <CTable columns={userTableColumn} items={usersList}></CTable>
    </>
  )
}

export default Users

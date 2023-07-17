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

const Feedback = () => {
  const [postsList, setPostsList] = useState([])
  const [feedbackId, setFeedbackId] = useState(-1)
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
      key: 'feedbackId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'detail',
      label: 'Feedback content',
      _props: { scope: 'col' },
    },
    {
      key: 'star',
      _props: { scope: 'col' },
    },
    {
      key: 'userId',
      label: 'By',
      _props: { scope: 'col' },
    },
    {
      key: 'dateFeedback',
      label: 'Date',
      _props: { scope: 'col' },
    },
    {
      key: 'reservationId',
      label: 'In Reservation',
      _props: { scope: 'col' },
    },
    {
      key: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const onHandleClickDeleteButtton = (e) => {
    setFeedbackId(e.target.value)
    setModalVisible(true)
  }

  useEffect(() => {
    const posts = async () => {
      instance
        .get('/feedback/all')
        .then((response) => {
          console.log(response.data)
          const data = response.data
          data.forEach((element) => {
            element['dateFeedback'] = element.dateFeedback.substring(0, 10)
            element['userId'] = element.user.fullName
            element['reservationId'] = element.reservation.reservationDetails[0].service.serviceName
            element['Action'] = (
              <>
                <Link to={'edit/' + element.feedbackId}>
                  <CButton value={element.feedbackId}>Edit</CButton>
                </Link>
                <CButton value={element.feedbackId} onClick={onHandleClickDeleteButtton}>
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
          <CModalTitle>Delete feedback</CModalTitle>
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
                .delete(`feedback/delete?id=${feedbackId}`)
                .then(async (response) => {
                  setToast(addToast('Delete Feedback', 'Delete feedback successfully.'))
                  await instance
                    .get('/feedback/all')
                    .then((response) => {
                      console.log(response.data)
                      const data = response.data
                      data.forEach((element) => {
                        element['dateFeedback'] = element.dateFeedback.substring(0, 10)
                        element['userId'] = element.user.fullName
                        element['reservationId'] =
                          element.reservation.reservationDetails[0].service.serviceName
                        element['Action'] = (
                          <>
                            <Link to={'edit/' + element.feedbackId}>
                              <CButton value={element.feedbackId}>Edit</CButton>
                            </Link>
                            <CButton
                              value={element.feedbackId}
                              onClick={onHandleClickDeleteButtton}
                            >
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
                  setToast(addToast('Delete Feedback', 'Delete feedback failed.'))
                })
              setModalVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <h1>Feedback List</h1>
      <Link to="add">
        <CButton color="primary">Add new feedback</CButton>
      </Link>
      <CTable columns={postTableColumn} items={postsList}></CTable>
    </>
  )
}

export default Feedback

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

const Service = () => {
  const [postsList, setPostsList] = useState([])
  const [serviceId, setServiceId] = useState(-1)
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
      key: 'serviceId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'serviceName',
      label: 'Service name',
      _props: { scope: 'col' },
    },
    {
      key: 'detail',
      _props: { scope: 'col' },
    },
    {
      key: 'type',
      label: 'Type',
      _props: { scope: 'col' },
    },
    {
      key: 'price',
      label: 'Price',
      _props: { scope: 'col' },
    },
    {
      key: 'rate',
      label: 'Rate',
      _props: { scope: 'col' },
    },
    {
      key: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const onHandleClickDeleteButtton = (e) => {
    setServiceId(e.target.value)
    setModalVisible(true)
  }

  useEffect(() => {
    const posts = async () => {
      instance
        .get('/services/all')
        .then((response) => {
          console.log(response.data)
          const data = response.data
          data.forEach((element) => {
            element['detail'] =
              element.detail.length > 100
                ? element.detail.substring(0, 100) + '...'
                : element.detail
            element['Action'] = (
              <>
                <Link to={'edit/' + element.serviceId}>
                  <CButton value={element.serviceId}>Edit</CButton>
                </Link>
                <CButton value={element.serviceId} onClick={onHandleClickDeleteButtton}>
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
          <CModalTitle>Delete service</CModalTitle>
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
                .delete(`services/delete?id=${serviceId}`)
                .then(async (response) => {
                  setToast(addToast('Delete Service', 'Delete service successfully.'))
                  await instance
                    .get('/services/all')
                    .then((response) => {
                      console.log(response.data)
                      const data = response.data
                      data.forEach((element) => {
                        element['Action'] = (
                          <>
                            <Link to={'edit/' + element.serviceId}>
                              <CButton value={element.serviceId}>Edit</CButton>
                            </Link>
                            <CButton value={element.serviceId} onClick={onHandleClickDeleteButtton}>
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
                  setToast(addToast('Delete Service', 'Delete service failed.'))
                })
              setModalVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <h1>Service List</h1>
      <Link to="add">
        <CButton color="primary">Add new service</CButton>
      </Link>
      <CTable columns={postTableColumn} items={postsList}></CTable>
    </>
  )
}

export default Service

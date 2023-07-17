import {
  CTable,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import instance from 'src/services/api.services'

const Settings = () => {
  const [settingList, setSettingList] = useState([])
  const [settingId, setSettingId] = useState(-1)
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
  const settingTableColumn = [
    {
      key: 'settingId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'value',
      label: 'Name',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      _props: { scope: 'col' },
    },
    {
      key: 'typeId',
      label: 'For',
      _props: { scope: 'col' },
    },
    {
      key: 'Action',
      _props: { scope: 'col' },
    },
  ]

  const onHandleClickDeleteButtton = (e) => {
    setSettingId(e.target.value)
    setModalVisible(true)
  }

  useEffect(() => {
    const settings = async () => {
      await instance
        .get('/settings/all')
        .then((response) => {
          const data = response.data
          data.forEach((element) => {
            element['typeId'] = element.type.typeName
            element['status'] = element.status === 1 ? 'On' : 'Off'
            element['Action'] = (
              <>
                <Link to={'edit/' + element.settingId}>
                  <CButton value={element.settingId}>Edit</CButton>
                </Link>
                <CButton value={element.settingId} onClick={onHandleClickDeleteButtton}>
                  Delete
                </CButton>
              </>
            )
          })
          setSettingList(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    settings()
  }, [setSettingList])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end"></CToaster>
      <CModal backdrop="static" visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader onClose={() => setModalVisible(false)}>
          <CModalTitle>Delete setting</CModalTitle>
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
                .delete(`settings/delete?id=${settingId}`)
                .then(async (response) => {
                  setToast(addToast('Delete Setting', 'Delete setting successfully.'))
                  await instance
                    .get('settings/all')
                    .then((response) => {
                      const data = response.data
                      data.forEach((element) => {
                        element['typeId'] = element.type.typeName
                        element['status'] = element.status === 1 ? 'On' : 'Off'
                        element['Action'] = (
                          <>
                            <Link to={'edit/' + element.settingId}>
                              <CButton value={element.settingId}>Edit</CButton>
                            </Link>
                            <CButton value={element.settingId} onClick={onHandleClickDeleteButtton}>
                              Delete
                            </CButton>
                          </>
                        )
                      })
                      setSettingList(data)
                    })
                    .catch((error) => {
                      console.log(error)
                      setSettingList([])
                    })
                })
                .catch((error) => {
                  console.log(error)
                  setToast(addToast('Delete Setting', 'Delete setting failed.'))
                })
              setModalVisible(false)
            }}
          >
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      <h1>Settings List</h1>
      <Link to="add">
        <CButton color="primary">Add new setting</CButton>
      </Link>
      <CTable columns={settingTableColumn} items={settingList}></CTable>
    </>
  )
}

export default Settings

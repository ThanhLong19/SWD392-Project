import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CButton,
  CFormSwitch,
} from '@coreui/react'
import instance from 'src/services/api.services'

const SettingEdit = () => {
  const param = useParams()
  const [settingId, setSettingId] = useState('')
  const [settingName, setSettingName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [listType, setListType] = useState([])
  const [type, setType] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      instance
        .get('/settings/getSettingById?id=' + param.id)
        .then((response) => {
          const data = response.data
          setSettingId(data.settingId)
          setSettingName(data.value)
          setDescription(data.description)
          setStatus(data.status === 1 ? true : false)
        })
        .catch((error) => {
          console.log('error')
        })
    }
    const fetchType = async () => {
      instance
        .get('types/all')
        .then((response) => {
          setListType(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchType()
    fetchData()
  }, [param.id])

  const navigate = useNavigate()

  const handleOnClickSaveUser = async (e) => {
    e.preventDefault()
    instance
      .patch('settings/update', {
        settingId,
        value: settingName,
        description,
        status,
        typeId: type,
      })
      .then((response) => {
        navigate('/settings')
      })
      .catch((error) => {
        console.log(error.status)
        navigate('/settings')
      })
  }

  return (
    <>
      <h1>Edit Settings</h1>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUserName" className="col-sm-2 col-form-label">
            Setting Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputUserName"
              value={settingName}
              onChange={(e) => setSettingName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Description
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputEmail3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputStatus" className="col-sm-2 col-form-label">
            Status
          </CFormLabel>
          <CCol sm={10}>
            <CFormSwitch
              label={status ? 'On' : 'Off'}
              id="switchStatus"
              defaultChecked={status}
              onChange={(e) => {
                setStatus(!status)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Type
          </CFormLabel>
          <CCol sm={10}>
            <CFormSelect
              id="inputType"
              onChange={(e) => {
                setType(e.target.value)
              }}
            >
              {listType.map((element) => (
                <option key={element.typeId} value={element.typeId}>
                  {element.typeName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CButton type="submit" onClick={handleOnClickSaveUser}>
          Save
        </CButton>
      </CForm>
    </>
  )
}
export default SettingEdit

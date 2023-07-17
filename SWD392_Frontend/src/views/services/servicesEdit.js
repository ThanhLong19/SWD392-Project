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
  const [serviceId, setServiceId] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [detail, setDetail] = useState('')
  const [status, setStatus] = useState(true)
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      instance
        .get('/services/getServiceById?id=' + param.id)
        .then((response) => {
          const data = response.data
          setServiceId(data.serviceId)
          setServiceName(data.serviceName)
          setDetail(data.detail)
          setStatus(data.status === 1 ? true : false)
          setType(data.type)
          setPrice(data.price)
        })
        .catch((error) => {
          console.log('error')
        })
    }
    fetchData()
  }, [param.id])

  const navigate = useNavigate()

  const handleOnClickSaveUser = async (e) => {
    e.preventDefault()
    instance
      .patch('services/update', {
        serviceId,
        serviceName,
        detail,
        status: status ? 1 : 0,
        type,
        price,
      })
      .then((response) => {
        navigate('/services')
      })
      .catch((error) => {
        console.log(error.status)
        navigate('/services')
      })
  }

  return (
    <>
      <h1>Edit Service</h1>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputUserName" className="col-sm-2 col-form-label">
            Setting Name
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputUserName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Detail
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputEmail3"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
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
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Type
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputEmail3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Price
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputEmail3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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

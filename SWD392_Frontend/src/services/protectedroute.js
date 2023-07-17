import { Navigate } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default ProtectedRoute
ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object,
}

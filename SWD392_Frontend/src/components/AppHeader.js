import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const role = localStorage.getItem('role')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          {role && role.match('Admin') && (
            <>
              <CNavItem>
                <CNavLink to="/users" component={NavLink}>
                  Users
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/settings" component={NavLink}>
                  Settings
                </CNavLink>
              </CNavItem>
            </>
          )}
          {role && role.match('Manager') && (
            <>
              <CNavItem>
                <CNavLink to="/posts" component={NavLink}>
                  Posts
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/services" component={NavLink}>
                  Services
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/feedback" component={NavLink}>
                  Feedback
                </CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader

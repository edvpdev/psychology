import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginPopup from './LoginPopup/LoginPopup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useMediaQuery, useMediaQueries} from '@react-hook/media-query'
import { MobileNavbar } from '../index'

import styles from './header.module.scss'

import {
  ADMIN_LOGOUT
} from '../../constants/adminConstants'

const Header = () => {
  let [loginPopupVisibility, setLoginPopupVisibility] = useState(false)
  let [mobileHeaderVisibility, setMobileHeaderVisibility] = useState(false)
  let [loggedIn, setLoggedIn] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const matches = useMediaQuery('(max-width: 400px)')

  useEffect(() => {
    if (adminInfo) {
      setLoggedIn(true) 
    }
  }, [adminInfo])

  const loginClickHandler = (e) => {
    e.preventDefault();
    setMobileHeaderVisibility(false)
    setLoginPopupVisibility(!loginPopupVisibility)
  }

  const hamburgerHandler = (e) => {
    e.preventDefault();
    setMobileHeaderVisibility(!mobileHeaderVisibility)
  }

  const logoutHandler = () => {
    dispatch({type: ADMIN_LOGOUT})
    setLoggedIn(false)
    history.push('/')
  }

  return (
    <nav className={`${styles.navbar} ${styles.bgPrimary}`}>
      <h1 className={styles.navbar__logo}>
        <Link to="/" className={styles.logo}>Logo</Link>
      </h1>
      {!matches && <ul className={styles.navbar__list}>
        <li className={styles.navbar__list__listItem}>
          <Link to="/articles">Articles</Link>
          {/* <a href="services.html">Services</a> */}
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/services">Services</Link>
          {/* <a href="services.html">Services</a> */}
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/specialists">Specialists</Link>
          {/* <a href="specialists.html">Specialists</a> */}
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/contact">Contact</Link>
          {/* <a href="contact.html">Contact</a> */}
        </li>
        {
          loggedIn && (
            <li className={styles.navbar__list__listItem}>
              <Link to="/admin">Admin</Link>
            </li>
          )
        }
        {
          !loggedIn && (
            <li className={styles.navbar__list__listItem } onClick={loginClickHandler}>
              <FontAwesomeIcon className={styles.navbar__list__listItem__icon} icon={faUser} size="lg" />
            </li>
          )
        }
        {
          loggedIn && (
            <li className={styles.navbar__list__listItem } onClick={logoutHandler}>
              <FontAwesomeIcon className={styles.navbar__list__listItem__icon} icon={faSignOutAlt} size="lg" />
            </li>
          )
        }
      </ul>}
      {
        loginPopupVisibility && !loggedIn && <LoginPopup setLoginVisibility={setLoginPopupVisibility} loginPopupVisibility={loginPopupVisibility}/>
      }
      {
        matches && 
        <ul className={styles.navbar__list}>
          <li className={styles.navbar__list__listItem } onClick={hamburgerHandler}>
            <FontAwesomeIcon className={styles.navbar__list__listItem__icon} icon={faBars} size="lg" />
          </li>
        </ul>
      }
      {
        mobileHeaderVisibility &&
        <MobileNavbar loggedIn={loggedIn} logoutHandler={logoutHandler} loginClickHandler={loginClickHandler}/>
      }
    </nav>
  )
}

export default Header

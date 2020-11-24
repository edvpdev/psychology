import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import styles from './mobilenavbar.module.scss'

const MobileNavbar = ({ loggedIn, logoutHandler, loginClickHandler}) => {
    return (
    <ul className={styles.navbar__list}>
        <li className={styles.navbar__list__listItem}>
          <Link to="/articles">Articles</Link>
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/services">Services</Link>
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/specialists">Specialists</Link>
        </li>
        <li className={styles.navbar__list__listItem}>
          <Link to="/contact">Contact</Link>
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
      </ul>
    )
}

export default MobileNavbar

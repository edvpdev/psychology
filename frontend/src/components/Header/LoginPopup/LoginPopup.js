import React, { useRef, useEffect } from 'react'
import { Button } from '../../../atoms/index'
import { InputField } from '../../../formComponents/index'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Formik } from 'formik';
import { useOnClickOutside } from '../../../hooks/index'
import * as Yup from "yup";

import { login } from '../../../actions/adminActions'

import styles from './loginpopup.module.scss'

const LoginPopup = ({loginPopupVisibility, setLoginVisibility}) => {

  const formikRef = useRef()
  const ref = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    if (adminInfo) {
      setLoginVisibility(false)
      history.push('/admin')  
    }
  }, [history, adminInfo, setLoginVisibility])

  useEffect(() => {
    formikRef.current.handleReset()
  }, [])

  useOnClickOutside(ref, () => setLoginVisibility(false))

  const submitHandler = (values) => {
    dispatch(login(values.username, values.password))
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={(values, actions) => {
          setTimeout(() => {
              actions.setSubmitting(false);
              submitHandler(values)
          }, 500);
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Required!"), 
        password: Yup.string()
          .min(6, "Minimum 8 characters")
          .required("Required!"),
      })}
    >
      {({values}) => (
        <div ref={ref} className={`${styles.loginPopup} ${loginPopupVisibility ? styles.visible : styles.hidden}`}>
          <Form style={{display: 'flex', alignItems: 'center'}}>
            <div style={{alignSelf: "flexStart", display: 'flex'}}>
              <InputField style={{
                  margin: ".5rem"
              }} name="username" type="text" label="Username"/>
              <InputField style={{
                  margin: ".5rem"
              }} name="password" type="text" label="Password"/>
            </div>               
            <Button text="Login" type="submit" className={`btnLogin`} />
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default LoginPopup
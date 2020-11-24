import React, { useEffect, useRef } from 'react'
import { InputField, SelectField, Textarea } from '../../formComponents/index'
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader, Button } from '../../atoms/index'
import * as Yup from "yup";

import styles from './contactform.module.scss'

import {
    listSpecialistNames
} from '../../actions/specialistsActions'

const ContactForm = () => {

    const formikRef = useRef();

    useEffect(() => {
        formikRef.current.handleReset()
    }, [])

    const dispatch = useDispatch()
    const specialistNames = useSelector((state) => state.specialistNames)
    const { loading: loadingSpecialists, error: errorSpecialists, specialists} = specialistNames

    useEffect(() => {
        dispatch(listSpecialistNames())
    }, [
        dispatch
    ])

    return (
        <Formik
            innerRef={formikRef}
            initialValues={{
                fullName: '',
                email: '',
                specialist: '',
                content: ''
            }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    // submitHandler(values)
                    console.log(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false);
                }, 500);
            }}
            validationSchema={Yup.object({
                fullName: Yup.string()
                    .min(4, "Minimum 8 characters")
                    .required("Required!"),
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!"), 
                specialist: Yup.string()
                    .required("Required!"),
                content: Yup.string()
                    .required("Required!"),
                })}
            >
            {({values}) => (
                <Form className={styles.contactForm}>
                    <InputField style={{
                        marginBottom: "1rem"
                    }} name="fullName" type="text" label="Your fullname"/>
                    <InputField style={{
                        marginBottom: "1rem"
                    }} name="email" type="text" label="Your email"/>
                    {
                        loadingSpecialists ? (
                                <Loader />
                        ) : errorSpecialists ? (
                                <Message variant='danger'>Failed to load specialists</Message>
                        ) : (
                            <SelectField 
                                style={{
                                    marginBottom: "1rem"
                                }} name="specialist" label="Specialist" options={specialists}
                            />
                        )
                    }
                    <Textarea name="content" label="Description"/>
                    <Button text="Submit" type="submit" className={`btnPrimary`} onClick={() => console.log('a')} />
                </Form>
            )}
        </Formik>
    )
}

export default ContactForm

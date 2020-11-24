import React, { useEffect, useRef } from 'react'
import { InputField, SelectField, TinyMCE } from '../../formComponents/index'
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Title, Button } from '../../atoms/index'
import { Message, Loader } from '../../atoms/index'
import * as Yup from "yup";

import styles from './sessionedit.module.scss'

import {
    listSessionDetails,
    resetSessionDetails,
    createSession,
    updateSession
} from '../../actions/sessionsActions'

import {
    listSpecialistNames
} from '../../actions/specialistsActions'

import {
    SESSION_CREATE_RESET,
    SESSION_UPDATE_RESET
} from '../../constants/sessionsConstants'

const SessionEditScreen = () => {

    const formikRef = useRef();

    useEffect(() => {
        if (formikRef.current !== null) {
            formikRef.current.handleReset()
        }
    }, [])

    const dispatch = useDispatch()
    const sessionDetails = useSelector((state) => state.sessionDetails)
    const { loading, error, session } = sessionDetails
    let { startAt, duration, availableSlots, description, title, holder, price } = session

    const specialistNames = useSelector((state) => state.specialistNames)
    const { loading: loadingSpecialists, error: errorSpecialists, specialists} = specialistNames

    let history = useHistory()
    const id = history.location.pathname.split('sessionedit/').length > 1 ?
        history.location.pathname.split('sessionedit/')[1] : ''

    const sessionUpdate = useSelector((state) => state.sessionUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = sessionUpdate

    const sessionCreate = useSelector((state) => state.sessionCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = sessionCreate

    useEffect(() => {
        if (id && id !== '' && !successUpdate && !successCreate) {
           dispatch(listSessionDetails(id)) 
           dispatch(listSpecialistNames())
        } else {
            if (successCreate || successUpdate) {
                dispatch(resetSessionDetails())
            }
        }
    }, [
        dispatch,
        history,
        id,
        successUpdate,
        successCreate
    ])

    useEffect(() => {
        dispatch({ type: SESSION_CREATE_RESET })
        dispatch({ type: SESSION_UPDATE_RESET })
    }, [dispatch])

    const submitHandler = (values) => {
        if (id) {
            dispatch(
                updateSession({
                    _id: id,
                    ...values
                })
            )
        } else {
            dispatch(createSession({...values}))
        }
    }

    return (
        <section className={styles.sessionEditSection}>
            {
                (loadingUpdate || loadingCreate || loading) ? (
                    <Loader />
                ) : (errorUpdate || errorCreate || error) ? (
                    <Message variant='danger'>{error}</Message>
                ) : (successCreate || successUpdate) ? (
                     <Message variant='danger'>Success</Message>
                ) : (
                    <>
                    <Title text="Session Edit" size="large" pos="center"/>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{
                            title: title || '',
                            holder: holder ? holder.fullName : 'Anyone',
                            description: description || '',
                            startsAt: startAt || '',
                            duration: duration ? parseInt(duration) : 0,
                            av_slots: availableSlots || 0,
                            price: price || 0
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .required("Required!"),
                            holder: Yup.string()
                                .required("Required!"),
                            description: Yup.string()
                                .required("Required!"),
                            startAt: Yup.date().required("Required!"),
                            duration: Yup.number()
                                .min(1, "At least 1 session")
                                .required("Required!"),
                            av_slots: Yup.number()
                                .min(0, "Minimum 8 characters")
                                .max(10, "Maximum availability is 10")
                                .required("Required!"),
                            price: Yup.number().min(1, "Price cannot be 0").required("Required!"),
                        })}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false);
                                submitHandler(values)
                                // console.log(JSON.stringify(values, null, 2))
                                
                            }, 1000);
                        }}
                        >
                        {({values}) => (
                            <Form>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="title" type="text" label="Title"/>
                                {
                                    loadingSpecialists ? (
                                        <Loader />
                                    ) : errorSpecialists ? (
                                            <Message variant='danger'>{error}</Message>
                                    ) : (
                                        <SelectField 
                                            style={{
                                                marginBottom: "1rem"
                                            }} name="holder" label="Holder" options={specialists}
                                        />
                                    )
                                }
                                <TinyMCE name="description" label="Description" value={values.description}/>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="startsAt" type="date" label="Starts at"/>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="duration" type="number" label="Duration (sessions)"/>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="av_slots" type="number" label="Available Slots"/>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="price" type="number" label="Price (euros)"/>
                                <Button text="Submit" type="submit" className={`btnPrimary`} />
                            </Form>
                        )}
                    </Formik>
                    </>
                )
            }
        </section>
    )
}

export default SessionEditScreen

import React, { useEffect, useRef } from 'react'
import { InputField, Textarea, AddGroupField, AddImage, SelectField } from '../../formComponents/index'
import { Form, Formik } from 'formik';
import { Message, Loader } from '../../atoms/index'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as Yup from "yup";

import { Title, Button } from '../../atoms/index'

import styles from './specialistedit.module.scss'

import {
    listSpecialistDetails,
    resetSpecialistDetails,
    createSpecialist,
    updateSpecialist
} from '../../actions/specialistsActions'

import {
    SPECIALIST_CREATE_RESET,
    SPECIALIST_UPDATE_RESET
} from '../../constants/specialistsConstants'

const SpecialistEditScreen = () => {

    const formikRef = useRef(null);

    useEffect(() => {
        if (formikRef.current !== null) {
            formikRef.current.setSubmitting(false);
            formikRef.current.handleReset()
        }
    }, [])

    const dispatch = useDispatch()
    const specialistDetails = useSelector((state) => state.specialistDetails)
    const { loading, error, specialist} = specialistDetails
    let { fullName, speciality, description, intro, publications, experience, image, status } = specialist

    const specialistUpdate = useSelector((state) => state.specialistUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = specialistUpdate

    const specialistCreate = useSelector((state) => state.specialistCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = specialistCreate

    let history = useHistory()
    const id = history.location.pathname.split('specialistedit/').length > 1 ?
        history.location.pathname.split('specialistedit/')[1] : ''

    useEffect(() => {
        if (id && id !== '' && !successUpdate && !successCreate) {
            dispatch(listSpecialistDetails(id)) 
        } else {
            if (successCreate || successUpdate) {
                dispatch(resetSpecialistDetails())
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
        dispatch({ type: SPECIALIST_CREATE_RESET })
        dispatch({ type: SPECIALIST_UPDATE_RESET })
    }, [dispatch])

    const submitHandler = (values) => {
        if (id) {
            dispatch(
                updateSpecialist({
                    _id: id,
                    ...values
                })
            )
        } else {
            dispatch(createSpecialist({...values}))
        }
    }

    return  (
        <section className={styles.specialistEditSection}>
            {
            (loadingUpdate || loadingCreate || loading) ? (
                <Loader />
            ) : (errorUpdate || errorCreate || error) ? (
                <Message variant='danger'>{error}</Message>
            ) : (successCreate || successUpdate) ? (
                <Message variant='danger'>Success</Message>
            ) : (
                <>
                    <Title text="Specialist Edit" size="large" pos="center"/>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{
                            fullName: fullName || '',
                            speciality: speciality || '',
                            description: description || '',
                            intro: intro || '',
                            status: status || 'active',
                            publications: publications && publications.length ? publications.map(({title, link}) => {
                                return {
                                    pub_title:title,
                                    pub_link:link
                                }
                            }) : [
                                {
                                    pub_title:'',
                                    pub_link:''
                                }
                            ],
                            workplaces: experience && experience.length ? experience.map(({title, years, description}) => {
                                return {
                                    company:title,
                                    position:description,
                                    start_year:years.split('-')[0],
                                    end_year:years.split('-')[1]
                                }
                            }) : [
                                {
                                    company:'',
                                    position:'',
                                    start_year:'',
                                    end_year:''
                                }    
                            ],
                            image: image || ''
                        }}
                        validationSchema={Yup.object({
                            fullName: Yup.string()
                              .required("Required!"),
                            speciality: Yup.string()
                              .required("Required!"),
                            description: Yup.string()
                              .required("Required!"),
                            intro: Yup.string()
                              .required("Required!"),
                            status: Yup.string()
                                .required("Required!"),
                            publications: Yup.array().of(Yup.object().shape({
                                pub_title: Yup.string().required(),
                                pub_link: Yup.string().url().required()
                            })),
                            workplaces: Yup.array().of(Yup.object().shape({
                                company: Yup.string().required(),
                                position: Yup.string().required(),
                                start_year: Yup.number().required(),
                                end_year: Yup.number().required()
                            })),
                            image: Yup.string().required()
                        })}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false);
                                submitHandler(values)
                                // // console.log(JSON.stringify(values, null, 2))
                                // actions.setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        {({values}) => (
                            <Form>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="fullName" type="text" label="Full name"/>
                                <InputField style={{
                                    marginBottom: "1rem"
                                }} name="speciality" type="text" label="Speciality"/>
                                <SelectField 
                                    style={{
                                        marginBottom: "1rem"
                                    }} name="status" label="Status" options={[{entry:'active', _id: 1}, {entry:'inactive', _id: 1}]}
                                />
                                <Textarea name="description" label="Description"/>
                                <Textarea name="intro" label="Short Intro"/>
                                <AddGroupField name="publications" label="Publications" 
                                    values={values.publications}
                                    placeholder={{
                                        pub_title:'',
                                        pub_link:''
                                    }}
                                    rowInputs={[
                                        {
                                            name: 'pub_title',
                                            label: 'Title',
                                            type: 'text',
                                            formikEntry: 'publications'
                                        },
                                        {
                                            name: 'pub_link',
                                            label: 'Link',
                                            type: 'text',
                                            formikEntry: 'publications'
                                        }
                                    ]}
                                />
                                <AddGroupField name="workplaces" label="Workplaces" 
                                    values={values.workplaces}
                                    placeholder={{
                                        company:'',
                                        position:'',
                                        start_year:'',
                                        end_year:''
                                    }}
                                    rowInputs={[
                                        {
                                            name: 'company',
                                            label: 'Company',
                                            type: 'text',
                                            formikEntry: 'workplaces'
                                        },
                                        {
                                            name: 'position',
                                            label: 'Position',
                                            type: 'text',
                                            formikEntry: 'workplaces'
                                        },
                                        {
                                            name: 'start_year',
                                            label: 'Start year',
                                            type: 'number',
                                            formikEntry: 'workplaces',
                                            style: {
                                                flexBasis: "20%"
                                            }
                                        },
                                        {
                                            name: 'end_year',
                                            label: 'End year',
                                            type: 'number',
                                            formikEntry: 'workplaces',
                                            style: {
                                                flexBasis: "20%"
                                            }
                                        }
                                    ]}
                                />
                                <AddImage name="image" />
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

export default SpecialistEditScreen

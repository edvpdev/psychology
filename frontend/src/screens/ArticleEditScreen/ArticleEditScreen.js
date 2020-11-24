import React, { useEffect, useRef } from 'react'
import { InputField, AddGroupField, SelectField, TinyMCE } from '../../formComponents/index'
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Message, Loader } from '../../atoms/index'
import * as Yup from "yup";

import { Title, Button } from '../../atoms/index'

import styles from './articleedit.module.scss'

import {
    listArticleDetails,
    resetArticleDetails,
    createArticle,
    updateArticle
} from '../../actions/articlesActions'

import {
    listSpecialistNames
} from '../../actions/specialistsActions'

import {
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_RESET
} from '../../constants/articlesConstants'

const ArticleEditScreen = () => {

    const formikRef = useRef(null);

    useEffect(() => {
        if (formikRef.current !== null) {
            formikRef.current.handleReset()
        }
    }, [])

    const dispatch = useDispatch()
    const articleDetails = useSelector((state) => state.articleDetails)
    const { loading, error, article} = articleDetails
    let { content, title, author, tags } =  article

    const specialistNames = useSelector((state) => state.specialistNames)
    const { loading: loadingSpecialists, error: errorSpecialists, specialists} = specialistNames

    let history = useHistory()
    const id = history.location.pathname.split('articleedit/').length > 1 ?
        history.location.pathname.split('articleedit/')[1] : ''

    const articleUpdate = useSelector((state) => state.articleUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = articleUpdate

    const articleCreate = useSelector((state) => state.articleCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = articleCreate

    useEffect(() => {
        if (id && id !== '' && !successUpdate && !successCreate) {
           dispatch(listArticleDetails(id))
           dispatch(listSpecialistNames())
        } else {
            if (successCreate || successUpdate) {
                dispatch(resetArticleDetails())
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
        dispatch({ type: ARTICLE_CREATE_RESET })
        dispatch({ type: ARTICLE_UPDATE_RESET })
    }, [dispatch])

    const submitHandler = (values) => {
        if (id) {
            dispatch(
                updateArticle({
                    _id: id,
                    ...values
                })
            )
        } else {
            dispatch(createArticle({...values}))
        }
    }

    return (
        <section className={styles.articleEditSection}>
            {
                (loadingUpdate || loadingCreate || loading) ? (
                    <Loader />
                ) : (errorUpdate || errorCreate || error) ? (
                    <Message variant='danger'>{error}</Message>
                ) : (successCreate || successUpdate) ? (
                    <Message variant='danger'>Success</Message>
                ) : (
                    <>
                    <Title text="Article Edit" size="large" pos="center"/>
                    <Formik
                        innerRef={formikRef}
                        className={styles.articleForm}
                        initialValues={{
                            title: title || '',
                            author: author ? author.fullName : '',
                            description: content && content.length ? content.map((p) => `<p>${p}</p>`).join().replaceAll(',','') : '',
                            tags: tags && tags.length ? tags.map((tag) => {
                                return {
                                    tag: tag
                                }
                            }) : [{
                                tag: ''
                            }],
                        }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                              .required("Required!"),
                            author: Yup.string()
                              .required("Required!"),
                            description: Yup.string()
                              .required("Required!"),
                            tags: Yup.array().of(Yup.string()
                                .required()
                            )
                        })}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                actions.setSubmitting(false);
                                submitHandler(values)
                                // console.log(JSON.stringify(values, null, 2))
                                
                            }, 500);
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
                                                }} name="author" label="Author" options={specialists}
                                            />
                                        )
                                    }
                                    <TinyMCE name="description" label="Description" value={values.description}/>
                                    <AddGroupField label="Tags" name="tags" rowInputs={[
                                        {
                                            name: 'tag',
                                            label: 'Tag',
                                            type: 'text',
                                            formikEntry: 'tags'
                                        }
                                        ]}
                                        values={values.tags}
                                        placeholder={{
                                            tag:''
                                        }}
                                    />
                                    <Button text="Submit" type="submit" className={`btnPrimary`} onClick={() => console.log('a')} />
                                </Form>
                        )}
                    </Formik>
                    </>
                )
            }
        </section>
    )
}

export default ArticleEditScreen

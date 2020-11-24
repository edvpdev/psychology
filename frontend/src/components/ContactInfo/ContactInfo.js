import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader } from '../../atoms/index'

import styles from './contactinfo.module.scss'

import {
    getContactsDetails,
} from '../../actions/contactsActions'

const ContactInfo = () => {

    const dispatch = useDispatch()
    const contactsDetails = useSelector((state) => state.contactsDetails)
    const { loading, error, contacts} = contactsDetails

    useEffect(() => {
        dispatch(getContactsDetails())
    }, [
        dispatch
    ])

    return (
        <div className={styles.contactInfo}>
            {
                loading ? (
                    <Loader />
                ): error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <div className={styles.howToFind}>
                            <p><strong>Address: </strong>{contacts.address}</p>
                            <p>{contacts.description}</p>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.title}>Modern psychology and psychotherapy centre</div>
                            <ul>
                                <li>
                                    <strong>Phone numbers: </strong>{contacts.phoneNumbers && contacts.phoneNumbers.map((number, indx) => (<span key={indx}>{number} </span>))}
                                </li>
                                <li><strong>Email address: </strong>{contacts.emailAddress}</li>
                                <li><strong>Company code: </strong>{contacts.companyCode}</li>
                                <li><strong>Bank number: </strong>{contacts.bankNumber}</li>
                                <li><strong>EXAMPLE Bank</strong></li>
                            </ul>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ContactInfo

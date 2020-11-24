import React from 'react'
import { GoogleMapBox, ContactInfo, ContactForm } from '../../components/index'
import { Title } from '../../atoms/index'

import styles from './contact.module.scss'

const Contact = () => {

    return (
        <section className={styles.contactSection}>
            <Title text="Contact us" size="medium" />
            <div className={styles.contactUs}>
                <ContactInfo />
                <GoogleMapBox />
            </div>
            <div className={styles.writeToUs}>
                <Title text="Write to us" size="medium" />
                <ContactForm />
            </div>
        </section>
    )
}

export default Contact

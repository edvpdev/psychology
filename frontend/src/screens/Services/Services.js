import React from 'react'
import { GroupSessions, IndividualSession} from '../../sections/index'
import { Title } from '../../atoms/index'

import styles from './services.module.scss'

const Services = () => {
    return (
        <section className={styles.services}>
            <Title size="large" text="Services"/>
            <IndividualSession />
            <GroupSessions />
        </section>
    )
}

export default Services

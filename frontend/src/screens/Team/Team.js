import React, { useEffect } from 'react'
import { ProfileCard } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { Title } from '../../atoms/index'
import { Message, Loader } from '../../atoms/index'

import styles from'./team.module.scss'

import {
    listSpecialists,
} from '../../actions/specialistsActions'

const Team = () => {

    const dispatch = useDispatch()
    const specialistList = useSelector((state) => state.specialistList)
    const { loading, error, specialists } = specialistList

    useEffect(() => {
        dispatch(listSpecialists())
    }, [
        dispatch,
    ])

    return loading ? (
        <section className={styles.specialistsSection}>
            <Loader />
        </section>
    ): error ? (
        <section className={styles.specialistsSection}>
            <Message variant='danger'>{error}</Message>
        </section>
    ) : (
        <section className={styles.specialistsSection}>
            {/* <h2>Our team</h2> */}
            <Title size="large" text="Our team" />
            <div className={styles.team}>
                {specialists && specialists.map((specialist) => (
                    <ProfileCard key={specialist._id} specialist={specialist}/>
                ))}
            </div>
        </section>
    )
}

export default Team

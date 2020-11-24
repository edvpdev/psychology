import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BackButton, Title } from '../../atoms/index'
import { ImgCard } from '../../components/index'
import { Message, Loader } from '../../atoms/index'

import styles from './specialist.module.scss'

import {
    listSpecialistDetails,
} from '../../actions/specialistsActions'

const Specialist = () => {
    let history = useHistory()
    let id = history.location.pathname.split('/')[2]

    const dispatch = useDispatch()
    const specialistDetails = useSelector((state) => state.specialistDetails)
    const {loading, error, specialist} = specialistDetails
    const {fullName, speciality, description, publications, experience, image} = specialist

    useEffect(() => {
        dispatch(listSpecialistDetails(id))
    },[
        dispatch,
        history,
        id
    ])

    return loading ? (
        <section className={styles.profileSection}>
            <Loader />
        </section>
    ): error ? (
        <section className={styles.profileSection}>
            <Message variant='danger'>{error}</Message>
        </section>
    ) : (
        <section className={styles.profileSection}>
            <BackButton onClick={() => history.goBack()}/>
            <div className={styles.profileSection__content}>
                <div className={styles.profileSection__content__personality}>
                    <div className={styles.imgWrapper}>
                        <ImgCard img={image} />
                    </div>
                    <div className={styles.personalDetails}>
                        <Title size="medium" text={fullName} />
                        <p className={styles.personalDetails__position}>{speciality}</p>
                        <p className={styles.personalDetails__description}>
                            {description}
                        </p>
                    </div>
                </div>
                <div className={styles.profileSection__content__publicationsCareer}>
                    <div className={styles.publications}>
                        <Title size="small" text="Publications: " />
                        <ul>
                            {publications.map(({title, link}, indx) => (
                                <li key={indx+1}>{title}<a href={link}>Read more</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.career}>
                        <Title size="small" text="Experience: " />
                        {experience.map(({title, years, description}, index) => (
                            <div  key={index} className={styles.workingPlace}>
                                <div className={styles.workingPlace__header}>
                                    <span>{title}</span><span>{years}</span>
                                </div>
                                <div className={styles.workingPlace__content}>
                                    <p>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Specialist

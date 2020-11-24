import React, {useEffect} from 'react'
import { SmallGallery } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../atoms/index'
import { Message, Loader } from '../../atoms/index'

import styles from './individual.module.scss'

import {
    listSpecialistImages,
} from '../../actions/specialistsActions'

const IndividualSession = () => {
    const dispatch = useDispatch()
    const specialistImages = useSelector((state) => state.specialistImages)
    const { loading, error, images } = specialistImages

    useEffect(() => {
        dispatch(listSpecialistImages())
    }, [
        dispatch,
    ])

    return loading ? (
        <div className={styles.individual}>
            <Loader />
        </div>
    ): error ? (
        <div className={styles.individual}>
            <Message variant='danger'>{error}</Message>
        </div>
    ) : (
        <div className={`${styles.individual}`}>
            <h3 className={styles.individual__title}>Individual sessions</h3>
            <div className={`${styles.individual__details} ${styles.bgGlass}`}>
                <p className={styles.details__info}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic maxime
                    ipsam, vel repellat ullam corrupti nostrum optio mollitia ea libero
                    sit, iste pariatur modi blanditiis fuga! Quaerat ad velit assumenda.
                </p>
                <SmallGallery imgs={images}/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.price}>29-39&euro;/session</p>
                <Button to="/contact" className="btnPrimary" text="Contact"/>
            </div>
        </div>
    )
}

export default IndividualSession

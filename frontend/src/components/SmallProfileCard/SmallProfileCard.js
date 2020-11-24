import React from 'react'
import { ImgCard } from '../../components/index'

import styles from './smallprofilecard.module.scss'

const SmallProfileCard = ({img, speciality, fullName}) => {
    return (
        <div className={styles.trainer}>
            <div className={styles.imgWrapper}>
                <ImgCard img={img} to={'/specialist/1'}/>
            </div>
            <p className={styles.name}>{fullName}</p>
            <p className={styles.speciality}>{speciality}</p>
        </div>
    )
}

export default SmallProfileCard

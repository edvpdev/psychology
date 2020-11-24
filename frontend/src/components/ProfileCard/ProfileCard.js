import React from 'react'
import { ImgCard } from '../../components/index'

import styles from './profile.module.scss'

const ProfileCard = ({specialist}) => {
    const { _id, fullName, intro, speciality, image} = specialist
    return (
        <div className={styles.profileBox}>
            <div className={styles.profileImgWrapper}>
                <ImgCard img={image} to={`/specialist/${_id}`}/>
            </div>
            <p className={styles.name}>{fullName}</p>
            <p className={styles.position}>{speciality}</p>
            <div className={styles.quote}>
                {`"${intro}"`}
            </div>
        </div>
    )
}

export default ProfileCard

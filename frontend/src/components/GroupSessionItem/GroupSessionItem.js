import React from 'react'
import { SmallProfileCard } from '../index'
import { Button } from '../../atoms/index'

import styles from './groupsessionitem.module.scss'

const GroupSessionItem = ({session}) => {
    const { title, holder, price, duration, startAt, availableSlots, description } = session
    const { image, fullName, speciality } = holder

    return (
        <div className={styles.groupInfo}>
        <h3 className={styles.title}>{title}</h3>
        <div className={`${styles.details} ${styles.bgGlass}`}>
          <div className={styles.detailsWrapper} >
            <p className={styles.about}>
              {description}
            </p>
            <div className={styles.miniDetails} >
              <div className={styles.availableSlots}>
                <span>Available slots: </span><span>{availableSlots}</span>
              </div>
              <div className={styles.startingDate}>
                <span>Starts: </span><span>{startAt}</span>
              </div>
              <div className={styles.duration}>
                <span>Duration: </span><span>{duration} sessions</span>
              </div>
              <div className={styles.priceInfo}>
                <span>Price: </span><span>{price} &euro;</span>
              </div>
            </div>
          </div>
          
          <SmallProfileCard img={image} speciality={speciality} fullName={fullName}/>
        </div>
        <Button to="/contact" className="btnPrimary" text="Contact" />
      </div>
    )
}

export default GroupSessionItem

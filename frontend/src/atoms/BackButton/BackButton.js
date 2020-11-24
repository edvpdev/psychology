import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from './backbutton.module.scss'

const BackButton = ({onClick}) => {
    return (
        <div className={styles.backWrapper} onClick={onClick}>
            {/* <Link to={to} > */}
                <FontAwesomeIcon className={styles.backWrapper__icon} icon={faArrowLeft} size="lg" />
            {/* </Link> */}
        </div>
    )
}

export default BackButton

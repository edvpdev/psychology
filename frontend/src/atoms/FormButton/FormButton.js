import React from 'react'

import styles from './formbutton.module.scss'

const FormButton = ({text, className}) => {
    return (
        <>
            <button type="submit" className={`${styles.btn} ${styles[className]}`}>{text}</button>
        </>
    )
}

export default FormButton

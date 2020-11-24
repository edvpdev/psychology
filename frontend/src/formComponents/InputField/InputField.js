import React from 'react'
import { useField } from 'formik';

import styles from './inputfield.module.scss'

const InputField = ({size, label, style, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={`${styles.inputGroup} ${styles[size]}`} style={style}>
            <div className={styles.inputHeader}>
                <label htmlFor="">{label}</label>
            </div>
            <input {...field} {...props}/>
            <div className={styles.error}>{meta.touched && meta.error ? 
                meta.error
             : null}</div> 
        </div>
    )
}

export default InputField

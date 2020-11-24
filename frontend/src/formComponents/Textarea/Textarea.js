import React from 'react'
import { useField } from 'formik';

import styles from './textarea.module.scss'

const Textarea = ({label, type, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.inputGroup}>
            <div className={styles.inputHeader}>
                <label htmlFor="">{label}</label>
            </div>
            <textarea
                {...field} {...props}
                resize="false"
                required
            ></textarea>
            <div className={styles.error}>{meta.touched && meta.error ? 
                meta.error
            : null}</div> 
        </div>
    )
}

export default Textarea

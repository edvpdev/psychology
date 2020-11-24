import React from 'react'
import { useField } from 'formik';

import styles from './selectfield.module.scss'

const SelectField = ({size, label, type, style, options, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={styles.inputGroup} style={style}>
            <>
                <label htmlFor="full-name">{label}</label>
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
            <select {...field} {...props}>
                {
                    options.map(({_id, entry}, indx) => (
                        <option key={_id} value={entry}>{entry}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectField

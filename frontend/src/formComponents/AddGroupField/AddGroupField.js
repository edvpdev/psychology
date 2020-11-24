import React from 'react'
import { InputField } from '../index'
import { Button } from '../../atoms/index'
import { FieldArray } from 'formik';

import styles from './addgroupfield.module.scss'

const Row = ({rowInputs, remove, indx, value}) => {
    return (
        <div className={styles.smallInputGroupWrapper}>
            {
                rowInputs.map(({name, label, type, style, formikEntry}, index) => {
                    let nameProp = `${formikEntry}.${indx}.${name}`
                    let valueProp = value[name]

                    return (
                    <InputField key={index} style={{
                            flexGrow: 2,
                            marginRight: ".5rem",
                            ...style
                        }} 
                        size="small" 
                        name={nameProp} 
                        label={label} 
                        type={type}
                        value={valueProp}
                    />)
                })
            }
            <Button style={{alignSelf: "center"}} text="Delete" size="small" className={`btnDefault`} onClick={() => remove()} />
        </div>
    )
}

const AddGroupField = ({label, name, rowInputs, values, placeholder}) => {
    return (
        <div className={styles.addGroup}>
            <FieldArray name={name}>
            {({ remove, push }) => (
                <>
                    <span className={styles.title} htmlFor="publications">{label}</span>
                    <Button text="Add More" size="small" className={`btnPrimary`} onClick={() => push(placeholder)} />
                    {values.length > 0 && values.map((value,indx) => (
                         <Row key={indx} value={value} indx={indx} rowInputs={rowInputs} remove={() => remove(indx)}/>
                    ))}
                </>
            )}
            </FieldArray>
        </div>
    )
}

export default AddGroupField

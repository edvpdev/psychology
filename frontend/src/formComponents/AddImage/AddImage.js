import React, { useState } from 'react'
import { useFormikContext } from 'formik';
import { Loader } from '../../atoms/index'
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './addimage.module.scss'

const AddImage = ({label, name, style, value, ...props}) => {

    const [uploading, setUploading] = useState(false)

    const {
        values,
        // touched,
        setFieldValue,
    } = useFormikContext();

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        for(var pair of formData.entries()) {
            console.log(pair[0]);
            console.log(pair[1])
        }
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
          
          const { data } = await axios.post('/api/upload', formData, config)
          console.log(name, data);
          setFieldValue(name, data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
    }

    return (
        <>
            <div className={`${styles.addImage}`}>
                <div className={styles.addImageWrapper}>
                    <label htmlFor="file-input">
                        <FontAwesomeIcon className={styles.icon} icon={faPlus} size="lg">
                        </FontAwesomeIcon>
                    </label>                   
                    <input id="file-input" name={name} type="file" onChange={uploadFileHandler} />
                </div>
                <span>Add profile image</span>  
            </div>
            <div className={styles.imageDetails}>
                {uploading && <Loader />}
                {
                !uploading && 
                    <>
                        <span>{values.image}</span>
                        {/* {values.image && <FontAwesomeIcon  className={styles.icon} icon={faTrash} />} */}
                    </>
                }
            </div>
        </>
    )
}

export default AddImage

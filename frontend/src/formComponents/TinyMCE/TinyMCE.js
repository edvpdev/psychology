import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useFormikContext } from 'formik';

import styles from './tinymce.module.scss'

const TinyMCE = ({label, name, style, value, ...props}) => {

    // const [field, meta, helpers] = useField(props);
    const {
        values: { description },
        // touched,
        setFieldValue,
    } = useFormikContext();

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        setFieldValue(name, content)
    }

    return (
        <div className={styles.inputGroup}>
            <>
                <label htmlFor={name}>{label}</label>
            </>
            <Editor
                name={name}
                initialValue={value}
                init={{
                    height: '300px',
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={(c, e) => handleEditorChange(c, e)}
            />
            {/* <div className={styles.error}>{meta.touched && meta.error ? 
                meta.error
             : null}</div>  */}
        </div>
    )
}

export default TinyMCE

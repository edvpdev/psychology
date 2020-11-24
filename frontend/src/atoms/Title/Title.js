import React from 'react'

import styles from './title.module.scss'

const Title = ({size, text, pos}) => {
    return (
        <h1 className={`${styles[size]} ${styles[pos]}`}>
            {text}
        </h1>
    )
}

export default Title

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './button.module.scss'

const Button = ({to, text, style, type, className, onClick, size}) => {
    return (
        <>
        {
            type === 'submit' ?
            <button style={{...style}} type={type} className={`${styles.btn} ${styles[className]} ${styles[size]}`}>{text}</button> :
            to ?
            <Link style={{...style}} to={to ? to : '#'} className={`${styles.btn} ${styles[className]} ${styles[size]}`}>{text}</Link> :
            <span style={{...style}} onClick={onClick ? () => onClick() : null} className={`${styles.btn} ${styles[className]} ${styles[size]}`}>{text}</span>
        }
        </>
    )
}

export default Button

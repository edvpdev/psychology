import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './imgcard.module.scss'

function calculateRatio(parent, child) {
    let parentHeight, parentWidth, childHeight, childWidth = 0

    if (parent.current && child.current){
        parentHeight = parent.current.offsetHeight;
        parentWidth  = parent.current.offsetWidth;
        childHeight = child.current.height;
        childWidth  = child.current.width;
    }

    if (parentHeight && parentWidth && childHeight && childWidth) {
        var parentRatio = parentHeight/parentWidth;
        var childRatio = childHeight/childWidth;

        return parentRatio < childRatio ? "width" : "height"
    }
}

const ImgCard = ({style, img, description, to}) => {
    let [ratio, setRatio] = useState("height")
    let [image, setImage] = useState('')

    const parent = useRef(null);
    const child = useRef(null);

    const imgOnloadHandler = () => {
        setRatio(calculateRatio(parent, child))
    }

    useEffect(() => {
        axios.get(`/api/fetch?file=${img}`, {responseType: 'blob'})
            .then(res => {
                let file = new File([res.data],'image', { type: "image/jpeg" } )
                var imageUrl = URL.createObjectURL(file)
                setImage(imageUrl)
            })
    }, [img])

    return (
        <div style={style} className={styles.imgWrapper} ref={parent} >
            {to ? 
                <Link to={to}>
                    <div 
                        alt={description}
                        style={{backgroundImage: `url(${image})`}}
                        className={`${styles.imgWrapper__img} ${styles[ratio]} ${styles.imgWrapper__img__onHover}`}
                        ref={child}
                        onLoad={() => imgOnloadHandler()}>
                    </div>
                </Link>
                :
                (<div 
                    alt={description}
                    style={{backgroundImage: `url(${image})`}}
                    className={`${styles.imgWrapper__img} ${styles[ratio]} ${styles.imgWrapper__img__onHover}`}
                    ref={child}
                    onLoad={() => imgOnloadHandler()}>
                </div>)
            }
        </div>
    )
}

export default ImgCard

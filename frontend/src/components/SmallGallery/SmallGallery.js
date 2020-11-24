import React from 'react'
import { ImgCard } from '../../components/index'

import styles from './smallgallery.module.scss'

const SmallGallery = ({imgs}) => {
    return (
        <div className={styles.specialists}>
          {imgs.map((img, indx) => (
             <div key={indx} className={styles.imgWrapper}>
              <ImgCard img={img}/>
            </div>
          ))}
        </div>
    )
}

export default SmallGallery

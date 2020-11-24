import React from 'react'

import { LatestArticles} from '../../sections/index'

import styles from './article.module.scss'

const Articles = () => {
    return (
        <div className={styles.articles} >
              <LatestArticles />
        </div>
    )
}

export default Articles

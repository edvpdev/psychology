import React from 'react'
import { Button, Title } from '../../atoms/index'
import { ImgCard } from '../../components/index'

import styles from './ArticleOverviewCard.module.scss'

const ArticleOverviewCard = ({ article }) => {
  let { title, author, date, content, _id, tags } = article

  return (
    <div className={styles.article}>
      <div className={styles.article__content}>
        <div className={styles.imgWrapper}>
          <ImgCard img={author.image}/>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.detailsWrapper__details}>
            <Title size="small" text={title} />
            <p className={styles.date}>{date}</p>
          </div>
          <p className={styles.author}>{author.fullName}</p>
          <p className={styles.preview}>{content[0]}</p>
          <div className={styles.tags}>
            <span className={styles.tags__title}>Tags: </span>
            {tags.map((tag, indx) => (
               <span key={indx} className={styles.tags__tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <Button to={`/article/${_id}`} className={`btnPrimary`} text="Read more"/>
    </div>
  )
}

export default ArticleOverviewCard

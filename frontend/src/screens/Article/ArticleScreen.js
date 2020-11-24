import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Title, BackButton } from '../../atoms/index'
import { ImgCard } from '../../components/index'
import { Message, Loader } from '../../atoms/index'

import styles from  './ArticleScreen.module.scss'

import {
    listArticleDetails,
} from '../../actions/articlesActions'

const ArticleScreen = () => {
    
    const dispatch = useDispatch()
    const articleDetails = useSelector((state) => state.articleDetails)
    const { loading, error, article} = articleDetails
    let { content, date, title, author } =  article

    let history = useHistory()
    const id = history.location.pathname.split('/')[2] || ''

    useEffect(() => {
        dispatch(listArticleDetails(id))
    }, [
        dispatch,
        history,
        id
    ])
    
    return loading ? (
        <section className={styles.articleSection}>
            <Loader />
        </section>
    ): error ? (
        <section className={styles.articleSection}>
            <Message variant='danger'>{error}</Message>
        </section>
    ) : (
        <section className={styles.articleSection}>
            <BackButton onClick={() => history.goBack()} />
            <Title text={title} size="medium"></Title>
            <h3>{author.fullName}</h3>
            <p className={styles.date}>{date}</p>
            <div className={styles.article}>
                <div className={styles.imgWrapper}>
                    <ImgCard img={author.image}/>
                </div>
                {content && content.map((paragraph, indx) => (
                    <p key={indx} className={styles.paragraph}>
                        {paragraph}
                    </p>
                ))}
                <div className={styles.buttons}>
                    <div className={styles.downloadable}>
                    <i className="fa fa-file-download"></i>
                    </div>
                    <div className={styles.socialsShare}>
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArticleScreen

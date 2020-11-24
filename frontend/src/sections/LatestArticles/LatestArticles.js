import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { ArticleOverviewCard, Pagination } from '../../components/index'
import { Button, Title } from '../../atoms/index'
import { Message, Loader } from '../../atoms/index'

import styles from './LatestArticles.module.scss'

import {
  listArticles,
} from '../../actions/articlesActions'

const LatestArticles = () => {
  const dispatch = useDispatch()
  const articlesList = useSelector((state) => state.articlesList)
  const { loading, error, articles, page, pages } = articlesList

  const history = useHistory();
  let pageNumber = history.location.search.match(/pageNumber=(\d)/) ? history.location.search.match(/pageNumber=(\d)/)[1] : 1;
  const { pathname } = history.location;

  useEffect(() => {
    if (pathname === '/') {
      dispatch(listArticles(1))
    }
    if (pathname === '/articles') {
      dispatch(listArticles(pageNumber))
    }
  }, [
    dispatch,
    history,
    pageNumber,
    pathname
  ])

  const articlePaginationHandler = (page) => {
      history.push(`/articles?pageNumber=${page}`)
  }

  return (
      <section className={styles.articles}>
        <div className={styles.articlesInner}>
          {
            loading ? (
                  <Loader />
            ): error ? (
                  <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Title text="Latest" size="medium" />
                {articles && articles.map((article, indx) => (
                  <ArticleOverviewCard key={indx+1} article={article} />
                ))}
                {pathname === '/' ? 
                  <Button to="/articles?pageNumber=1" className="btnPrimary" text="See all"/> :
                  <Pagination pages={pages} page={page} handler={articlePaginationHandler}/>
                }
              </>
            )
          }
        </div>
      </section>
    )
}

export default LatestArticles

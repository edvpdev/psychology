import axios from 'axios'
import {
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_RESET,
    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_RESET,
    ARTICLE_DETAILS_FAIL,
    ARTICLE_TITLES_REQUEST,
    ARTICLE_TITLES_SUCCESS,
    ARTICLE_TITLES_FAIL,
    ARTICLE_TITLES_RESET,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL
} from '../constants/articlesConstants'

export const listArticles = (pageNumber = '') => async (
    dispatch
) => {
    try {
      dispatch({ type: ARTICLE_LIST_REQUEST })
  
      const { data } = await axios.get(
        `/api/articles?pageNumber=${pageNumber}`
      )
  
      dispatch({
        type: ARTICLE_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ARTICLE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const resetArticles = () => async (
  dispatch
) => {
  try {
    dispatch({type: ARTICLE_LIST_RESET})
  } catch (error) {
    dispatch({
      type: ARTICLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listArticleDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ARTICLE_DETAILS_REQUEST })
      const { data } = await axios.get(`/api/articles/${id}`)
      dispatch({
        type: ARTICLE_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ARTICLE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const resetArticleDetails = () => async (
  dispatch
) => {
  try {
    dispatch({type: ARTICLE_DETAILS_RESET})
  } catch (error) {
    dispatch({
      type: ARTICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listArticlesTitles = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_TITLES_REQUEST })

    const { data } = await axios.get(`/api/articles/titles?pageNumber=${pageNumber}`)

    dispatch({
      type: ARTICLE_TITLES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_TITLES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetArticlesTitles = () => async (
  dispatch
) => {
  try {
    dispatch({type: ARTICLE_TITLES_RESET})
  } catch (error) {
    dispatch({
      type: ARTICLE_TITLES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createArticle = (article) => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLE_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/articles`, article)

    dispatch({
      type: ARTICLE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ARTICLE_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateArticle = (article) => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLE_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/articles/${article._id}`, article)

    dispatch({
      type: ARTICLE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ARTICLE_UPDATE_FAIL,
      payload: message,
    })
  }
}
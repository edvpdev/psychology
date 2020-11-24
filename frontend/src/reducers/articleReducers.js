import {
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_RESET,
    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_FAIL,
    ARTICLE_DETAILS_RESET,
    ARTICLE_TITLES_REQUEST,
    ARTICLE_TITLES_SUCCESS,
    ARTICLE_TITLES_FAIL,
    ARTICLE_TITLES_RESET,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET
} from '../constants/articlesConstants'

export const articleListReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
      case ARTICLE_LIST_REQUEST:
        return { loading: true, articles: [] }
      case ARTICLE_LIST_SUCCESS:
        return {
          loading: false,
          articles: action.payload.articles,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case ARTICLE_LIST_FAIL:
        return { loading: false, error: action.payload }
      case ARTICLE_LIST_RESET:
        return { articles: [] }
      default:
        return state
    }
}
  
export const articleDetailsReducer = (
    state = { article: { } },
    action
) => {
    switch (action.type) {
      case ARTICLE_DETAILS_REQUEST:
        return { ...state, loading: true }
      case ARTICLE_DETAILS_SUCCESS:
        return { loading: false, article: action.payload }
      case ARTICLE_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case ARTICLE_DETAILS_RESET:
        return { article: { } }
      default:
        return state
    }
}

export const articleTitlesReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case ARTICLE_TITLES_REQUEST:
      return { loading: true, articles: [] }
    case ARTICLE_TITLES_SUCCESS:
      return {
        loading: false,
        articles: action.payload.articles,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ARTICLE_TITLES_FAIL:
      return { loading: false, error: action.payload }
    case ARTICLE_TITLES_RESET:
      return { articles: [] }
    default:
      return state
  }
}

export const articleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_REQUEST:
      return { loading: true }
    case ARTICLE_CREATE_SUCCESS:
      return { loading: false, success: true, article: action.payload }
    case ARTICLE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ARTICLE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const articleUpdateReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case ARTICLE_UPDATE_REQUEST:
      return { loading: true }
    case ARTICLE_UPDATE_SUCCESS:
      return { loading: false, success: true, article: action.payload }
    case ARTICLE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ARTICLE_UPDATE_RESET:
      return { article: {} }
    default:
      return state
  }
}
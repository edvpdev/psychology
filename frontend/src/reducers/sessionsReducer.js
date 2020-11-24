import {
    SESSIONS_LIST_REQUEST,
    SESSIONS_LIST_SUCCESS,
    SESSIONS_LIST_FAIL,
    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_FAIL,
    SESSION_DETAILS_RESET,
    SESSIONS_TITLES_REQUEST,
    SESSIONS_TITLES_SUCCESS,
    SESSIONS_TITLES_FAIL,
    SESSION_CREATE_REQUEST,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    SESSION_CREATE_RESET,
    SESSION_UPDATE_REQUEST,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
    SESSION_UPDATE_RESET
} from '../constants/sessionsConstants'

export const sessionsListReducer = (state = { sessions: [] }, action) => {
    switch (action.type) {
      case SESSIONS_LIST_REQUEST:
        return { loading: true, sessions: [] }
      case SESSIONS_LIST_SUCCESS:
        return {
          loading: false,
          sessions: action.payload.sessions
        }
      case SESSIONS_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const sessionDetailsReducer = (
  state = { session: { } },
  action
) => {
  switch (action.type) {
    case SESSION_DETAILS_REQUEST:
      return { ...state, loading: true }
    case SESSION_DETAILS_SUCCESS:
      return { loading: false, session: action.payload }
    case SESSION_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case SESSION_DETAILS_RESET:
      return { session: { } }
    default:
      return state
  }
}

export const sessionsTitlesReducer = (state = { sessions: [] }, action) => {
  switch (action.type) {
    case SESSIONS_TITLES_REQUEST:
      return { loading: true, sessions: [] }
    case SESSIONS_TITLES_SUCCESS:
      return {
        loading: false,
        sessions: action.payload.sessions,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case SESSIONS_TITLES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const sessionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_CREATE_REQUEST:
      return { loading: true }
    case SESSION_CREATE_SUCCESS:
      return { loading: false, success: true, session: action.payload }
    case SESSION_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SESSION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const sessionUpdateReducer = (state = { session: {} }, action) => {
  switch (action.type) {
    case SESSION_UPDATE_REQUEST:
      return { loading: true }
    case SESSION_UPDATE_SUCCESS:
      return { loading: false, success: true, session: action.payload }
    case SESSION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SESSION_UPDATE_RESET:
      return { session: {} }
    default:
      return state
  }
}
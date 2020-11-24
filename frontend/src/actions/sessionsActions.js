import axios from 'axios'
import {
    SESSIONS_LIST_REQUEST,
    SESSIONS_LIST_SUCCESS,
    SESSIONS_LIST_FAIL,
    SESSION_DETAILS_REQUEST,
    SESSION_DETAILS_SUCCESS,
    SESSION_DETAILS_RESET,
    SESSION_DETAILS_FAIL,
    SESSIONS_TITLES_REQUEST,
    SESSIONS_TITLES_SUCCESS,
    SESSIONS_TITLES_FAIL,
    SESSION_CREATE_REQUEST,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    SESSION_UPDATE_REQUEST,
    SESSION_UPDATE_SUCCESS,
    SESSION_UPDATE_FAIL,
} from '../constants/sessionsConstants'

export const listSessions = () => async (
    dispatch
) => {
    try {
      dispatch({ type: SESSIONS_LIST_REQUEST })
  
      const { data } = await axios.get(
        `/api/sessions`
      )
  
      dispatch({
        type: SESSIONS_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SESSIONS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const listSessionsTitles = (pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: SESSIONS_TITLES_REQUEST })

    const { data } = await axios.get(`/api/sessions/titles?pageNumber=${pageNumber}`)

    dispatch({
      type: SESSIONS_TITLES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SESSIONS_TITLES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSessionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SESSION_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/sessions/${id}`)
    dispatch({
      type: SESSION_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetSessionDetails = () => async (
  dispatch
) => {
  try {
    dispatch({type: SESSION_DETAILS_RESET})
  } catch (error) {
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSession = (session) => async (dispatch) => {
  try {
    dispatch({
      type: SESSION_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/sessions`, session)

    dispatch({
      type: SESSION_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SESSION_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateSession = (session) => async (dispatch) => {
  try {
    dispatch({
      type: SESSION_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/sessions/${session._id}`, session)

    dispatch({
      type: SESSION_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SESSION_UPDATE_FAIL,
      payload: message,
    })
  }
}
import axios from 'axios'
import {
    SPECIALIST_LIST_REQUEST,
    SPECIALIST_LIST_SUCCESS,
    SPECIALIST_LIST_FAIL,
    SPECIALIST_DETAILS_REQUEST,
    SPECIALIST_DETAILS_SUCCESS,
    SPECIALIST_DETAILS_FAIL,
    SPECIALIST_DETAILS_RESET,
    SPECIALIST_IMAGES_REQUEST,
    SPECIALIST_IMAGES_SUCCESS,
    SPECIALIST_IMAGES_FAIL,
    SPECIALISTS_NAMES_REQUEST,
    SPECIALISTS_NAMES_SUCCESS,
    SPECIALISTS_NAMES_FAIL,
    SPECIALISTS_NAMES_RESET,
    SPECIALIST_CREATE_REQUEST,
    SPECIALIST_CREATE_SUCCESS,
    SPECIALIST_CREATE_FAIL,
    SPECIALIST_UPDATE_REQUEST,
    SPECIALIST_UPDATE_SUCCESS,
    SPECIALIST_UPDATE_FAIL,
} from '../constants/specialistsConstants'

export const listSpecialists = (active) => async (
    dispatch
) => {
    try {
      dispatch({ type: SPECIALIST_LIST_REQUEST })
  
      const { data } = await axios.get(
        active ? `/api/specialists` : `/api/specialists/active`
      )
  
      dispatch({
        type: SPECIALIST_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SPECIALIST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const listSpecialistDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: SPECIALIST_DETAILS_REQUEST })
  
      const { data } = await axios.get(`/api/specialists/${id}`)
  
      dispatch({
        type: SPECIALIST_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SPECIALIST_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const resetSpecialistDetails = () => async (
  dispatch
) => {
  try {
    dispatch({type: SPECIALIST_DETAILS_RESET})
  } catch (error) {
    dispatch({
      type: SPECIALIST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSpecialistImages = () => async (dispatch) => {
  try {
    dispatch({ type: SPECIALIST_IMAGES_REQUEST })

    const { data } = await axios.get(`/api/specialists/images`)

    dispatch({
      type: SPECIALIST_IMAGES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SPECIALIST_IMAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSpecialistNames = (pageNumber = '',active = false) => async (dispatch) => {
  try {
    dispatch({ type: SPECIALISTS_NAMES_REQUEST })

    const { data } = await axios.get(`/api/specialists/names?pageNumber=${pageNumber}&active=${active}`)

    dispatch({
      type: SPECIALISTS_NAMES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SPECIALISTS_NAMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetSpecialistNames = () => async (dispatch) => {
  try {
    dispatch({ type: SPECIALISTS_NAMES_RESET })
  } catch (error) {
    dispatch({
      type: SPECIALISTS_NAMES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createSpecialist = (specialist) => async (dispatch) => {
  try {
    dispatch({
      type: SPECIALIST_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/specialists`, specialist)

    dispatch({
      type: SPECIALIST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SPECIALIST_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateSpecialist = (specialist) => async (dispatch) => {
  try {
    dispatch({
      type: SPECIALIST_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/specialists/${specialist._id}`, specialist)

    dispatch({
      type: SPECIALIST_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: SPECIALIST_UPDATE_FAIL,
      payload: message,
    })
  }
}
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
    SPECIALIST_CREATE_RESET,
    SPECIALIST_UPDATE_REQUEST,
    SPECIALIST_UPDATE_SUCCESS,
    SPECIALIST_UPDATE_FAIL,
    SPECIALIST_UPDATE_RESET
} from '../constants/specialistsConstants'

export const specialistListReducer = (state = { specialists: [] }, action) => {
    switch (action.type) {
      case SPECIALIST_LIST_REQUEST:
        return { loading: true, specialists: [] }
      case SPECIALIST_LIST_SUCCESS:
        return {
          loading: false,
          specialists: action.payload.specialists,
        }
      case SPECIALIST_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}
  
export const specialistDetailsReducer = (
    state = { specialist: { } },
    action
) => {
    switch (action.type) {
      case SPECIALIST_DETAILS_REQUEST:
        return { ...state, loading: true }
      case SPECIALIST_DETAILS_SUCCESS:
        return { loading: false, specialist: action.payload }
      case SPECIALIST_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      case  SPECIALIST_DETAILS_RESET:
        return { specialist: {}}
      default:
        return state
    }
}

export const specialistImagesReducer = (
  state = { images: [] },
  action
) => {
  switch (action.type) {
    case SPECIALIST_IMAGES_REQUEST:
      return { ...state, loading: true }
    case SPECIALIST_IMAGES_SUCCESS:
      return { loading: false, images: action.payload }
    case SPECIALIST_IMAGES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const specialistNamesReducer = (
  state = { specialists: [] },
  action
) => {
  switch (action.type) {
    case SPECIALISTS_NAMES_REQUEST:
      return { ...state, loading: true }
    case SPECIALISTS_NAMES_SUCCESS:
      return { loading: false, specialists: action.payload.specialists, pages: action.payload.pages,
        page: action.payload.page }
    case SPECIALISTS_NAMES_FAIL:
      return { loading: false, error: action.payload }
    case SPECIALISTS_NAMES_RESET:
      return { speciallists: [] }
    default:
      return state
  }
}
export const specialistCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SPECIALIST_CREATE_REQUEST:
      return { loading: true }
    case SPECIALIST_CREATE_SUCCESS:
      return { loading: false, success: true }
    case SPECIALIST_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SPECIALIST_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const specialistUpdateReducer = (state = { specialist: {} }, action) => {
  switch (action.type) {
    case SPECIALIST_UPDATE_REQUEST:
      return { loading: true }
    case SPECIALIST_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case SPECIALIST_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case SPECIALIST_UPDATE_RESET:
      return { specialist: {} }
    default:
      return state
  }
}
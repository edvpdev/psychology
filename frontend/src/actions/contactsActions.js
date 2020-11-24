import axios from 'axios'
import {
    CONTACTS_DETAILS_REQUEST,
    CONTACTS_DETAILS_SUCCESS,
    CONTACTS_DETAILS_FAIL
} from '../constants/contactsConstants'

export const getContactsDetails = () => async (dispatch) => {
    try {
      dispatch({ type: CONTACTS_DETAILS_REQUEST })
      const { data } = await axios.get(`/api/contacts`)
      dispatch({
        type: CONTACTS_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CONTACTS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}
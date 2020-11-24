import {
    CONTACTS_DETAILS_REQUEST,
    CONTACTS_DETAILS_SUCCESS,
    CONTACTS_DETAILS_FAIL
} from '../constants/contactsConstants'

export const contactsDetailsReducer = (
    state = { contacts: { } },
    action
) => {
    switch (action.type) {
      case CONTACTS_DETAILS_REQUEST:
        return { ...state, loading: true }
      case CONTACTS_DETAILS_SUCCESS:
        return { loading: false, contacts: action.payload }
      case CONTACTS_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}
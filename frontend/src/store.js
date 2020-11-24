import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    adminLoginReducer
} from './reducers/adminReducer'

import {
    articleListReducer,
    articleDetailsReducer,
    articleTitlesReducer,
    articleUpdateReducer,
    articleCreateReducer
} from './reducers/articleReducers'

import {
    specialistListReducer,
    specialistDetailsReducer,
    specialistImagesReducer,
    specialistNamesReducer,
    specialistCreateReducer,
    specialistUpdateReducer
} from './reducers/specialistsReducer'

import {
    sessionsListReducer,
    sessionsTitlesReducer,
    sessionDetailsReducer,
    sessionCreateReducer,
    sessionUpdateReducer
} from './reducers/sessionsReducer'

import {
    contactsDetailsReducer
} from './reducers/contactsReducer'

const reducer = combineReducers({
    articlesList: articleListReducer,
    articleDetails: articleDetailsReducer,
    specialistList: specialistListReducer,
    specialistDetails: specialistDetailsReducer,
    specialistImages: specialistImagesReducer,
    sessionsList: sessionsListReducer,
    contactsDetails: contactsDetailsReducer,
    articleTitles: articleTitlesReducer,
    specialistNames: specialistNamesReducer,
    sessionsTitles: sessionsTitlesReducer,
    sessionDetails: sessionDetailsReducer,
    specialistCreate: specialistCreateReducer,
    specialistUpdate: specialistUpdateReducer,
    articleUpdate: articleUpdateReducer,
    articleCreate: articleCreateReducer,
    sessionCreate: sessionCreateReducer,
    sessionUpdate: sessionUpdateReducer,
    adminLogin: adminLoginReducer
})

const initialState = {
    articleDetails: { article: {_id: '', content: '', date: '', title: '', author: {}, tags: []} },
    specialistDetails: {specialist: {_id: '', fullName: '', speciality: '', description:'', publications: [], experience: [], image:''}},
    contactDetails: {contacts: { phoneNumbers: []}}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
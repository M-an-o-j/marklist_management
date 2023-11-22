import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import teacherDatastate from './slices/teacherSlices'

const reducer = combineReducers({
    Teacherdatastate : teacherDatastate
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;
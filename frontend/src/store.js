import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userdatastate from './slices/userSlices'

const reducer = combineReducers({
    Userdatastate : userdatastate
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;
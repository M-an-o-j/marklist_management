import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import teacherDatastate from './slices/teacherSlices'
import studentdatastate from './slices/studentslices'
import marklistdatastate from './slices/marklistslices'

const reducer = combineReducers({
    Teacherdatastate : teacherDatastate,
    Studentdatastate: studentdatastate,
    Marklistdatastate : marklistdatastate
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;
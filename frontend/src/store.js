import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import teacherDatastate from './slices/teacherSlices'
import studentdatastate from './slices/studentslices'
import marklistdatastate from './slices/marklistslices'
import getstudentsstate from './slices/getstudents'

const reducer = combineReducers({
    Teacherdatastate : teacherDatastate,
    Studentdatastate: studentdatastate,
    Marklistdatastate : marklistdatastate,
    Getstudentdatastate : getstudentsstate
})

const store = configureStore({
    reducer,
    middleware: [thunk]
})

export default store;
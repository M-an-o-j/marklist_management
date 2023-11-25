import { createSlice } from '@reduxjs/toolkit'

const getallstudents = createSlice({
    name: 'getstudentsslice',
    initialState: {
        loading: false,
        studentsdata:null
    },
    reducers: {
        getstudentsdataRequest(state, action) {
            return {
                loading:true,
                studentsdata:null
            }
        },
        getstudentsdataSuccess(state, action) {
            return {
                loading:false,
                studentsdata:action.payload
            }
        },
        getstudentsdataError(state, action) {
            return {
                loading:false,
                studentsdata:action.payload
            }
        }
    }
})

const { actions, reducer } = getallstudents;

export const {
    getstudentsdataRequest,
    getstudentsdataSuccess,
    getstudentsdataError
} = actions;

export default reducer;
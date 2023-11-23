import { createSlice } from '@reduxjs/toolkit'

const studentslice = createSlice({
    name: 'studentslice',
    initialState: {
        Sloading: false,
        SisAuthenticated : false,
        student: null,
        studentdata:null,
        Srole:"student"
    },
    reducers: {
        registerstudentRequest(state, action) {
            return {
                ...state,
                Sloading: true
            }
        },
        registerstudentSuccess(state, action) {
            return {
                Sloading: false,
                SisAuthenticated:true,
                student:action.payload,
                studentdata:null
            }
        },
        registerstudentError(state, action) {
            return {
                Sloading: false,
                SisAuthenticated:false,
                studentdata:null,
                Serror:action.payload
            }
        },
        loginstudentRequest(state, action) {
            return {
                ...state,
                Sloading: true,
                studentdata:null
            }
        },
        loginstudentSuccess(state, action) {
            return {
                Srole: "student",
                Sloading: false,
                SisAuthenticated:true,
                student:action.payload,
                studentdata:null
            }
        },
        loginstudentError(state, action) {
            return {
                ...state,
                Sloading: false,
                SisAuthenticated:false,
                Serror:action.payload,
                studentdata:null
            }
        },
        studentdataRequest(state, action) {
            return {
                SisAuthenticated:false,
                Sloading: true,
                student:null,
                studentdata:null
            }
        },
        studentdataSuccess(state, action) {
            return {
                Srole: "student",
                Sloading: false,
                SisAuthenticated:true,
                student:action.payload,
                studentdata:action.payload
            }
        },
        studentdataError(state, action) {
            return {
                Sloading: false,
                SisAuthenticated:false,
                Serror:action.payload,
                studentdata:null
            }
        },
        logoutstudentRequest(state, action) {
            return {
                ...state,
                Sloading: true,
                studentdata:null,
            }
        },
        logoutstudentSuccess(state, action) {
            return {
                Sloading: false,
                SisAuthenticated:false,
                student:null,
                message:action.payload,
                studentdata:null
            }
        },
        logoutstudentError(state, action) {
            return {
                Sloading: false,
                SisAuthenticated:false,
                Serror:action.payload,
                studentdata:null
            }
        },

    }
})

const { actions, reducer } = studentslice;

export const {
    registerstudentRequest, 
    registerstudentSuccess,
    registerstudentError,
    loginstudentRequest,
    loginstudentSuccess,
    loginstudentError,
    studentdataRequest,
    studentdataSuccess,
    studentdataError,
    logoutstudentRequest,
    logoutstudentSuccess,
    logoutstudentError
} = actions;

export default reducer;
import { createSlice } from '@reduxjs/toolkit'

const userslice = createSlice({
    name: 'teacherslice',
    initialState: {
        loading: false,
        isAuthenticated : false,
        user: null,
        userdata:null,
        role:null
    },
    reducers: {
        registeruserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        registeruserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:null
            }
        },
        registeruserError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                userdata:null,
                error:action.payload
            }
        },
        loginteacherRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null
            }
        },
        loginteacherSuccess(state, action) {
            return {
                role: "teacher",
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:null
            }
        },
        loginteacherError(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        loginstudentRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null
            }
        },
        loginstudentSuccess(state, action) {
            return {
                role: "student",
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:null
            }
        },
        loginstudentError(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        teacherdataRequest(state, action) {
            return {
                isAuthenticated:false,
                loading: true,
                user:null,
                userdata:null
            }
        },
        teacherdataSuccess(state, action) {
            return {
                role: "teacher",
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:action.payload
            }
        },
        teacherdataError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        studentdataRequest(state, action) {
            return {
                isAuthenticated:false,
                loading: true,
                user:null,
                userdata:null
            }
        },
        studentdataSuccess(state, action) {
            return {
                role: "student",
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:action.payload
            }
        },
        studentdataError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        
        logoutteacherRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null,
            }
        },
        logoutteacherSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                user:null,
                message:action.payload,
                userdata:null
            }
        },
        logoutteacherError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        logoutstudentRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null,
            }
        },
        logoutstudentSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                user:null,
                message:action.payload,
                userdata:null
            }
        },
        logoutstudentError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },

    }
})

const { actions, reducer } = userslice;

export const {
    registeruserRequest, 
    registeruserSuccess, 
    registeruserError,
    loginteacherRequest,
    loginteacherSuccess,
    loginteacherError,
    loginstudentRequest,
    loginstudentSuccess,
    loginstudentError,
    teacherdataRequest,
    teacherdataSuccess,
    teacherdataError,
    studentdataRequest,
    studentdataSuccess,
    studentdataError,
    logoutteacherRequest,
    logoutteacherSuccess,
    logoutteacherError,
    logoutstudentRequest,
    logoutstudentSuccess,
    logoutstudentError
} = actions;

export default reducer;
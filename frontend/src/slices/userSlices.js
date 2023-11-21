import { createSlice } from '@reduxjs/toolkit'

const userslice = createSlice({
    name: 'userslice',
    initialState: {
        loading: false,
        isAuthenticated : false,
        user: null,
        userdata:null
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
        loginuserRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null
            }
        },
        loginuserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:null
            }
        },
        loginuserError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        userdataRequest(state, action) {
            return {
                isAuthenticated:false,
                loading: true,
                user:null,
                userdata:null
            }
        },
        userdataSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:true,
                user:action.payload,
                userdata:action.payload
            }
        },
        userdataError(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                error:action.payload,
                userdata:null
            }
        },
        
        logoutuserRequest(state, action) {
            return {
                ...state,
                loading: true,
                userdata:null,
            }
        },
        logoutuserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated:false,
                user:null,
                message:action.payload,
                userdata:null
            }
        },
        logoutuserError(state, action) {
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
    loginuserRequest, 
    loginuserSuccess,
    loginuserError,
    userdataRequest,
    userdataSuccess,
    userdataError,
    logoutuserRequest,
    logoutuserSuccess,
    logoutuserError
} = actions;

export default reducer;
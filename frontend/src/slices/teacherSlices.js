import { createSlice } from '@reduxjs/toolkit'

const teacherslice = createSlice({
    name: 'teacherslice',
    initialState: {
        Tloading: false,
        TisAuthenticated : false,
        teacher: null,
        teacherdata:null,
        Trole:"teacher"
    },
    reducers: {
        registerteacherRequest(state, action) {
            return {
                ...state,
                Tloading: true
            }
        },
        registerteacherSuccess(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:true,
                teacher:action.payload
            }
        },
        registerteacherError(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload
            }
        },
        loginteacherRequest(state, action) {
            return {
                ...state,
                Tloading: true
            }
        },
        loginteacherSuccess(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:true,
                teacher:action.payload
            }
        },
        loginteacherError(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload
            }
        },
        teacherdataRequest(state, action) {
            return {
                ...state,
                TisAuthenticated:false,
                Tloading: true,
                teacher:null
            }
        },
        teacherdataSuccess(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:true,
                teacher:action.payload
            }
        },
        teacherdataError(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload
            }
        },
        
        logoutteacherRequest(state, action) {
            return {
                ...state,
                Tloading: true
            }
        },
        logoutteacherSuccess(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:false,
                teacher:null,
                message:action.payload
            }
        },
        logoutteacherError(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload
            }
        }

    }
})

const { actions, reducer } = teacherslice;

export const {
    registerteacherRequest, 
    registerteacherSuccess, 
    registerteacherError,
    loginteacherRequest,
    loginteacherSuccess,
    loginteacherError,
    teacherdataRequest,
    teacherdataSuccess,
    teacherdataError,
    logoutteacherRequest,
    logoutteacherSuccess,
    logoutteacherError
} = actions;

export default reducer;
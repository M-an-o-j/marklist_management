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
                teacher:action.payload,
                teacherdata:null
            }
        },
        registerteacherError(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:false,
                teacherdata:null,
                Terror:action.payload
            }
        },
        loginteacherRequest(state, action) {
            return {
                ...state,
                Tloading: true,
                teacherdata:null
            }
        },
        loginteacherSuccess(state, action) {
            return {
                Trole: "teacher",
                Tloading: false,
                TisAuthenticated:true,
                teacher:action.payload,
                teacherdata:null
            }
        },
        loginteacherError(state, action) {
            return {
                ...state,
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload,
                teacherdata:null
            }
        },
        teacherdataRequest(state, action) {
            return {
                TisAuthenticated:false,
                Tloading: true,
                teacher:null,
                teacherdata:null
            }
        },
        teacherdataSuccess(state, action) {
            return {
                Trole: "teacher",
                Tloading: false,
                TisAuthenticated:true,
                teacher:action.payload,
                teacherdata:action.payload
            }
        },
        teacherdataError(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload,
                teacherdata:null
            }
        },
        
        logoutteacherRequest(state, action) {
            return {
                ...state,
                Tloading: true,
                teacherdata:null,
            }
        },
        logoutteacherSuccess(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:false,
                teacher:null,
                message:action.payload,
                teacherdata:null
            }
        },
        logoutteacherError(state, action) {
            return {
                Tloading: false,
                TisAuthenticated:false,
                Terror:action.payload,
                teacherdata:null
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
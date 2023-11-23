import axios from 'axios'
import {
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
} from '../slices/teacherSlices'

export const registeruser = (username, password) => async (dispatch) => {

    try {
        dispatch(registeruserRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/teacher/createTeacher', {
            'username': username,
            'password': password
        })
        dispatch(registeruserSuccess(data))
    } catch (error) {
        dispatch(registeruserError(error))
    }
}
export const loginteacher = (username, password) => async (dispatch) => {
    try {
        dispatch(loginteacherRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/teacher/logininTeacher/', {
            'username': username,
            'password': password
        })
        localStorage.setItem("mk_token", data.user.access_token,);
        dispatch(loginteacherSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(loginteacherError(error.response))
    }
}
export const loginstudent = (username, password) => async (dispatch) => {
    try {
        dispatch(loginstudentRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/student/signinstudent/', {
            'username': username,
            'password': password
        })
        localStorage.setItem("mk_token", data.user.access_token,);
        dispatch(loginstudentSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(loginstudentError(error.response))
    }
}
export const Logoutteacher = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_token')
        dispatch(logoutteacherRequest());
        const { data } = await axios.post("http://127.0.0.1:5001/api/v1/teacher/logoutTeacher/", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(logoutteacherSuccess(data))
        console.log(data)
        localStorage.removeItem('mk_token')
    } catch (error) {
        dispatch(logoutteacherError(error))
    }
}
export const Logoutstudent = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_token')
        dispatch(logoutstudentRequest());
        const { data } = await axios.post("http://127.0.0.1:5001/api/v1/student/signoutstudent/", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(logoutstudentSuccess(data))
        console.log(data)
        localStorage.removeItem('mk_token')
    } catch (error) {
        dispatch(logoutstudentError(error))
    }
}
export const loadteacher = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_token')
        console.log(token);
        dispatch(teacherdataRequest());
        if (token) {

            const { data } = await axios.get('http://127.0.0.1:5001/api/v1/teacher/getMyProfile/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(teacherdataSuccess(data));
        } else {
            console.log("token must")
        }
    } catch (error) {
        dispatch(teacherdataError(error.response))
    }
}
export const loadstudent = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_token')
        console.log(token);
        dispatch(studentdataRequest());
        if (token) {

            const { data } = await axios.get('http://127.0.0.1:5001/api/v1/student/getMyProfile/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(studentdataSuccess(data));
        }
    } catch (error) {
        dispatch(studentdataError(error.response))
    }
}
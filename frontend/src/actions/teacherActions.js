import axios from 'axios'
import {
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
} from '../slices/teacherSlices'

export const registeruser = (username, password) => async (dispatch) => {

    try {
        dispatch(registerteacherRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/teacher/createTeacher', {
            'username': username,
            'password': password
        })
        dispatch(registerteacherSuccess(data))
    } catch (error) {
        dispatch(registerteacherError(error))
    }
}
export const loginteacher = (username, password) => async (dispatch) => {
    try {
        dispatch(loginteacherRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/teacher/logininTeacher/', {
            'username': username,
            'password': password
        })
        localStorage.setItem("mk_teacher_token", data.access_token,);
        console.log(data);
        dispatch(loginteacherSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(loginteacherError(error.response))
    }
}

export const Logoutteacher = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_teacher_token')
        dispatch(logoutteacherRequest());
        const { data } = await axios.post("http://127.0.0.1:5001/api/v1/teacher/logoutTeacher/", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(logoutteacherSuccess(data))
        console.log(data)
        localStorage.removeItem('mk_teacher_token')
    } catch (error) {
        dispatch(logoutteacherError(error))
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

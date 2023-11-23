import axios from "axios";
import { loginstudentError, loginstudentRequest, loginstudentSuccess, logoutstudentError, logoutstudentRequest, logoutstudentSuccess, studentdataError, studentdataRequest, studentdataSuccess } from "../slices/studentslices";

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
import axios from "axios";
import { loginstudentError, loginstudentRequest, loginstudentSuccess, logoutstudentError, logoutstudentRequest, logoutstudentSuccess, studentdataError, studentdataRequest, studentdataSuccess, getstudentsRequest, getstudentsSuccess, getstudentsError } from "../slices/studentslices";
import {getstudentsdataError, getstudentsdataRequest, getstudentsdataSuccess} from "../slices/getstudents"
export const loginstudent = (username, password) => async (dispatch) => {
    try {
        dispatch(loginstudentRequest())
        const { data } = await axios.post('http://127.0.0.1:5001/api/v1/student/signinstudent/', {
            'username': username,
            'password': password
        })
        localStorage.setItem("mk_student_token", data.access_token,);
        console.log(data);
        dispatch(loginstudentSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(loginstudentError(error.response))
    }
}

export const Logoutstudent = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_student_token')
        dispatch(logoutstudentRequest());
        const { data } = await axios.post("http://127.0.0.1:5001/api/v1/student/signoutstudent/", null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch(logoutstudentSuccess(data))
        localStorage.removeItem('mk_student_token')
    } catch (error) {
        dispatch(logoutstudentError(error))
    }
}

export const loadstudent = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_student_token')
        console.log("studenttoken", token);
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
export const getstudent = async (dispatch) => {
    try {
        dispatch(getstudentsdataRequest());

        const { data } = await axios.get('http://127.0.0.1:5001/api/v1/student/getAllstudent/')
        // console.log(data);
        dispatch(getstudentsdataSuccess(data));
    } catch (error) {
        dispatch(getstudentsdataError(error.response))
    }
}
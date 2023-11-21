import axios from 'axios'
import {
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
} from '../slices/userSlices'

export const registeruser = (username, password) => async (dispatch) => {

    try {
        dispatch(registeruserRequest())
        const {data} = await axios.post('http://127.0.0.1:5001/api/v1/teacher/createTeacher', {
            'username':username,
            'password':password
        })
        dispatch(registeruserSuccess(data))
    } catch (error) {
        dispatch(registeruserError(error))
    }
}
export const loginteacher = (username,password) => async (dispatch) => {
    try {
        dispatch(loginuserRequest())
        const {data} = await axios.post('http://127.0.0.1:5001/api/v1/teacher/logininTeacher/',{
            'username':username,
            'password':password
        })
        localStorage.setItem("mk_token",data.user.access_token,);
        dispatch(loginuserSuccess(data))
    } catch (error) {
        console.log(error)
        dispatch(loginuserError(error))
    }
}
export const Logoutuser = async(dispatch) => {
    try{
        const token = localStorage.getItem('mk_token')
        dispatch(logoutuserRequest());
        const {data} = await axios.post("http://127.0.0.1:5001/api/v1/teacher/logoutTeacher/",null,{
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        dispatch(logoutuserSuccess(data))
        console.log(data)
        localStorage.removeItem('mk_token')
    }catch(error){
        dispatch(logoutuserError(error))
    }
}
export const loaduser = async(dispatch) => {
    try{
        const token = localStorage.getItem('mk_token')
        console.log(token);
        dispatch(userdataRequest());
        const {data} = await axios.get('http://127.0.0.1:5001/api/v1/teacher/getMyProfile/',{
            headers:{
                Authorization : `Bearer ${token}`
            }})
        dispatch(userdataSuccess(data));
        console.log(data.user);
    }catch(error){
        dispatch(userdataError(error))
    }
}
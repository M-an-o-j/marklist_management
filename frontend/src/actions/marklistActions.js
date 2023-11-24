import axios from "axios";
import { marklistdataError, marklistdataRequest, marklistdataSuccess } from "../slices/marklistslices";

export const loadmarklist = async (dispatch) => {
    try {
        const student_token = localStorage.getItem('mk_student_token')
        const teacher_token = localStorage.getItem('mk_teacher_token')
        dispatch(marklistdataRequest());
        if (student_token|| teacher_token) {

            const { data } = await axios.get('http://127.0.0.1:5001/api/v1/marklist/getAllmarklist', {
                headers: {
                    Authorization: `Bearer ${student_token ? student_token : teacher_token}`
                }
            })
            dispatch(marklistdataSuccess(data));
        }
    } catch (error) {
        dispatch(marklistdataError(error.response))
    }
}
import axios from "axios";
import { marklistdataError, marklistdataRequest, marklistdataSuccess } from "../slices/marklistslices";

export const loadmarklist = async (dispatch) => {
    try {
        const token = localStorage.getItem('mk_token')
        dispatch(marklistdataRequest());
        if (token) {

            const { data } = await axios.get('http://127.0.0.1:5001/api/v1/marklist/getAllmarklist', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(marklistdataSuccess(data));
        }
    } catch (error) {
        dispatch(marklistdataError(error.response))
    }
}
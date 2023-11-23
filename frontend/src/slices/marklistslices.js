import { createSlice } from '@reduxjs/toolkit'

const marklistslice = createSlice({
    name: 'marklistslice',
    initialState: {
        loading: false,
        marklist:null
    },
    reducers: {
        marklistdataRequest(state, action) {
            return {
                loading:true,
                marklist:null
            }
        },
        marklistdataSuccess(state, action) {
            return {
                loading:false,
                marklist:action.payload
            }
        },
        marklistdataError(state, action) {
            return {
                loading:false,
                marklist:action.payload
            }
        }
    }
})

const { actions, reducer } = marklistslice;

export const {
    marklistdataRequest,
    marklistdataSuccess,
    marklistdataError
} = actions;

export default reducer;
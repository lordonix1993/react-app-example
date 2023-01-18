import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: ''
    },
    reducers: {
        setAuthTokenAction(state, action) {
            console.log(action);
            state.token = action.payload
        }
    }
})

export default authSlice.reducer
export const {setAuthTokenAction} = authSlice.actions
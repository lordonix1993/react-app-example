import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
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

export default AuthSlice.reducer
export const {setAuthTokenAction} = AuthSlice.actions
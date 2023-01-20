import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        token: '',
        user: {}
    },
    reducers: {
        setAuthTokenAction(state, action) {
            console.log(action);
            state.token = action.payload
        },
        setAuthUserDataAction(state, action) {
            state.user = action.payload
        }
    }
})

export default AuthSlice.reducer
export const {setAuthTokenAction, setAuthUserDataAction} = AuthSlice.actions
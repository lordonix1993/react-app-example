import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: {}
    },
    reducers: {
        setAuthUserDataAction(state, action) {
            state.user = action.payload
        }
    }
})

export default AuthSlice.reducer
export const { setAuthUserDataAction } = AuthSlice.actions
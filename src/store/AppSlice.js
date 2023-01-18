import {createSlice} from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: "app",
    initialState: {
        loading: false,
        errors: []
    },
    reducers: {
        setAppLoadingAction(state, action) {
            state.loading = action.payload
        },
        setAppErrorsAction(state, action) {
            state.errors.push(action.payload)
        }
    }
})

export default AppSlice.reducer
export const {setAppLoadingAction, setAppErrorsAction} = AppSlice.actions
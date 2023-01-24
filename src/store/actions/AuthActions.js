import { http } from "../../libs/http";
import { config_main } from "../../config/main";
import { setAuthUserDataAction } from "../auth/AuthSlice";

export const loginAuthAction = (dispatch, data, cb = () => {}) => {
    return (dispatch) => {
        http.post(`/auth/login`, {...data})
            .then(res => {
                localStorage.setItem('access_token', res.data?.data?.access_token)
                dispatch(setAuthUserDataAction(res.data?.data?.user))
                cb(res)
            }).catch(e => {
                if(e.response !== undefined && e.response !== null) {
                    cb(e.response)
                } else {
                    cb(false)
                }
        })
    }
}

export const registerAuthAction = (dispatch, data, cb = () => {}) => {
    return (dispatch) => {
        http.post(`/auth/register`, {...data})
            .then(res => {
                localStorage.setItem('access_token', res.data?.data?.access_token)
                dispatch(setAuthUserDataAction(res.data?.data?.user))
                cb(res)
            }).catch(e => {
            if(e.response !== undefined && e.response !== null) {
                cb(e.response)
            } else {
                cb(false)
            }
        })
    }
}

export const checkAuthAction = (dispatch, cb = () => {}) => {
    return async (dispatch) => {
        try {
            const res = await http.post(`/auth/me`, {})
            dispatch(setAuthUserDataAction(res.data?.data))
            cb(res.data?.success)
        } catch(e) {
            clearAuthStorage(dispatch)
            cb(e.data?.success)
        }
    }
}

export const logoutAuthAction = (dispatch, cb = () => {}) => {
    return async (dispatch) => {
        try {
            await http.post(`${config_main.server_url_v1}/auth/logout`, {})
        } catch(e) {}
        clearAuthStorage(dispatch)
        cb(true)
    }
}

const clearAuthStorage = (dispatch) => {
    localStorage.removeItem('access_token')
    dispatch(setAuthUserDataAction({}))
}

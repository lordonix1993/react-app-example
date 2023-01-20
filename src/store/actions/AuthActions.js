import axios from "axios";
import {config_main} from "../../config/config";
import {setAuthTokenAction, setAuthUserDataAction} from "../auth/AuthSlice";

export const loginAuthAction = (dispatch, data, cb = () => {}) => {
    return (dispatch) => {
        axios.post(`${config_main.server_url_v1}/auth/login`, {...data})
            .then(res => {
                dispatch(setAuthTokenAction(res.data?.data?.access_token))
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
        axios.post(`${config_main.server_url_v1}/auth/register`, {...data})
            .then(res => {
                dispatch(setAuthTokenAction(res.data?.data?.access_token))
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

export const checkAuthAction = (dispatch, token, cb = () => {}) => {
    return async (dispatch) => {
        if(token) {
            try {
                const res = await axios.post(`${config_main.server_url_v1}/auth/me`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch(setAuthUserDataAction(res.data?.data))
                cb(res.data?.success)
            } catch(e) {
                clearAuthStorage(dispatch)
                cb(e.data?.success)
            }
        } else {
            cb(false)
        }
    }
}

export const logoutAuthAction = (dispatch, token, cb = () => {}) => {
    return async (dispatch) => {
        if(token) {
            try {
                await axios.post(`${config_main.server_url_v1}/auth/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            } catch(e) {}
        }
        clearAuthStorage(dispatch)
        cb(true)
    }
}

const clearAuthStorage = (dispatch) => {
    dispatch(setAuthTokenAction(''))
    dispatch(setAuthUserDataAction({}))
}

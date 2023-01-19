import axios from "axios";
import {config_main} from "../../config/config";
import {setAuthTokenAction} from "../auth/AuthSlice";
import {setAppLoadingAction} from "../AppSlice";

export const LoginAuthAction = (dispatch, data, cb = () => {}) => {
    return () => {
        axios.post(`${config_main.server_url_v1}/auth/login`, {...data})
            .then(res => {
                dispatch(setAuthTokenAction(res.data?.data?.access_token))
                dispatch(setAppLoadingAction(true))
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
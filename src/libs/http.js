import axios from "axios";
import { config_main } from "../config/main";

export const http = axios.create({
    baseURL: `${config_main.server_url_v1}`,
});

http.interceptors.request.use(
    function (config) {
        const access_token = localStorage.getItem('access_token')
        if(access_token !== null && access_token !== '') {
            config.headers['Authorization'] = `Bearer ${access_token}`
        }

        let lang = localStorage.getItem('i18nextLng')
        if(lang !== null) config.baseURL = `${config.baseURL}/${lang}`

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const error_codes = ["ERR_NETWORK", "ERR_BAD_RESPONSE"]
        if(error_codes.includes(error.code)) return window.location.href = '/server-error'
        return Promise.reject(error);
    }
);

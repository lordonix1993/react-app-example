import axios from "axios";
import { config_main } from "../config/main";

export const http = axios.create({
    baseURL: config_main.server_url_v1,
});

http.interceptors.request.use(
    function (config) {
        const access_token = localStorage.getItem('access_token')
        if(access_token !== null && access_token !== '') {
            config.headers['Authorization'] = `Bearer ${access_token}`
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
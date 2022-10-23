import api, {ApiError} from "./api";
import {NavigateFunction} from "react-router-dom";
import {userSlice} from "../stores/user/user-slice";

export const setupInterceptors = (dispatch,navigate: NavigateFunction) => {
    api.interceptors.response.use(undefined,({response}) => {
        throw new ApiError(response.data?.error ?? "Произошла ошибка при запросе на сервер", response.data?.status ?? 400, response.data?.code);
    })

    api.interceptors.response.use(null,(error : ApiError) => {
        if (error.status === 401) {
            dispatch(userSlice.actions.clearUser())
        }
        throw error;
    })
    api.interceptors.response.use((response) => {
        if (response.data) {
            handleDates(response.data)
        }
        return response
    })

    api.interceptors.request.use((req) => {
        if (localStorage.user) {
            req.headers = {...req.headers,"custom-user": localStorage.user}
        }
        return req
    })

}

const handleDates = (object: object) => {
    for (let param in object) {
        if (object[param] instanceof Object) {
           handleDates(object[param]);
        } else {
            if (object[param] && typeof object[param] === "string") {
                if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(object[param])) {
                    object[param] = new Date(object[param])
                }
            }
        }
    }
}
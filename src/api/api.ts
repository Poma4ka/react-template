import axios, {AxiosInstance} from "axios";

export class ApiError {
    error: string
    status: number
    code?: string

    constructor(
        error: string,
        status: number,
        code?: string
    ) {
        this.error = error
        this.status = status
        this.code = code
    }
}

const api : AxiosInstance = axios.create({
    headers: {
        "Authorization": `Bearer ${123}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    },
    baseURL: "/api",
    timeout: 10000
});

export default api










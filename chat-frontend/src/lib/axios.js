import axios from "axios"

export const axiosRequest = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true // we will be sending each request with credentials / cookies
})
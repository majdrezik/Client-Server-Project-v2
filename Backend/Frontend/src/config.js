import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : "https://client-server-mmsi.herokuapp.com/"
    
})
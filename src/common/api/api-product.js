import axios from 'axios'
import { setInterceptors } from './interceptors'


const axiosService = axios.create({
    baseURL: process.env.PRODUCT_API_BASE_URL
    // baseURL: 'http://localhost:8070/'
})

// console.log(process.env.VUE_APP_API_URL)
axiosService.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8"
axiosService.defaults.headers.get["Cache-Control"] = "no-cache"
axiosService.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

setInterceptors(axiosService)
export default axiosService 
import axios from "axios";

const axiosInterceptor = axios.create();
axiosInterceptor.interceptors.request.use(request =>{
    console.log("Request Intercepted for URL - ",request.url)
    request.baseURL = 'http://localhost:9090/api';
    if(!request.url.includes('users')){
        request.headers = {
            "Content-Type" : "application/json",
            "synechron-authorization-token" : `${localStorage.getItem('token')}`,
        }
    }
    return request;
})

export default axiosInterceptor;
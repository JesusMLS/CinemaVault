import axios from 'axios'
import { API_BASE_URL } from './constants'

const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

API.interceptors.response.use(
        response => response,
        error =>{
            if(error.response?.status === 401){
                window.location.href='/login'
            }
            return Promise.reject(error)
        }
);


export default API;
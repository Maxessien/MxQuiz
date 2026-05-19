import axios from 'axios';

export const authApi = (token: string)=> axios.create({
   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
   headers: {Authorization: `Bearer ${token}`},
   withCredentials: true
})

export const regApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})
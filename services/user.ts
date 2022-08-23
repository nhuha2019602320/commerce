import { data } from "autoprefixer"
import axios from "axios"

interface data {
    name: string,
    email: string,
    phone: string,
    password: string
}

export const RegisterAccount = async (data: any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/Register`, data)
}

export const LoginAccount = async (data: any) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/user/Login`, data)
}
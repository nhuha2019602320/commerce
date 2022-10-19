import { data } from 'autoprefixer';
import axios from "axios"

export const PostProduct = async (data: any) => {
    return  await axios.post(`${process.env.NEXT_PUBLIC_API_IMG}`, data)
    .then((res => localStorage.setItem('img', res.data.url)))
}

export const DeleteProduct = async (id: string) => {
    console.log("test",id)
    return await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/product/deleteItemProduct`, {id: id})
}
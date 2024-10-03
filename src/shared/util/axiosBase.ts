import  axios from "axios";

export  const  axiosBase = axios.create({
    baseURL: "https://todos-be.vercel.app/",
})
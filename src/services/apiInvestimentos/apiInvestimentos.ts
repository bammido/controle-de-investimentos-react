import axios from "axios";
import { sendToken } from "./interceptors";

const url = import.meta.env.VITE_API_INVESTIMENTOS

export const apiInvestimentos = axios.create({
    baseURL: url
})

apiInvestimentos.interceptors.request.use(sendToken)
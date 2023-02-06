import axios from "axios";

const url = import.meta.env.VITE_API_INVESTIMENTOS

export const apiInvestimentos = axios.create({
    baseURL: url
})


import { AxiosRequestConfig, AxiosHeaders, InternalAxiosRequestConfig } from "axios"
import getTokenLocal from "../../helpers/functions/getTokenLocal"
import verifyToken from "../../helpers/functions/verifyToken";

export function sendToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token: any = getTokenLocal();

    (config.headers as AxiosHeaders)['x-auth-token'] = token

    return config
}
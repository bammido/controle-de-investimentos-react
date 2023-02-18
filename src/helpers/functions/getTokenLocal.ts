import decryptAES from "./decryptAES"

export default function getTokenLocal() {
    const cryptoToken = localStorage.getItem('usuario_token')

    const decryptedToken = decryptAES(cryptoToken as string)

    return decryptedToken
}
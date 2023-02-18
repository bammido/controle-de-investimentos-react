import cryptoAES from './cryptoAES';

export default function setTokenLocal(token: string) {
    const cryptoToken = cryptoAES(token)

    return localStorage.setItem('usuario_token', cryptoToken)
}
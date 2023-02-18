export default function setTokenLocal(token: string) {
    return localStorage.setItem('usuario_token', token)
}
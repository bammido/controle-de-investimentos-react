import * as jose from 'jose'

const privateKey = import.meta.env.VITE_JWT_PRIVATE_KEY

const secret = new TextEncoder().encode(privateKey)

export default async function verifyToken(token: string) {
    try {
        const jwt = await jose.jwtVerify(token, secret, { clockTolerance: "23h" })

        return jwt
    } catch (error: any) {
        let cause = error
        let mensagem = error.message

        if (mensagem.includes("exp")) {
            mensagem = "tempo de sessão expirado, necessário fazer login novamente"
        }

        throw new Error(mensagem, { cause: cause })
    }
}
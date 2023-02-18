import * as jose from 'jose'

const privateKey = import.meta.env.VITE_JWT_PRIVATE_KEY

const secret = new TextEncoder().encode(privateKey)

export default async function crypto(data: any, expiresIn?: string | number) {
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({ data })
        .setProtectedHeader({ alg })
        .setExpirationTime(expiresIn || '1h')
        .sign(secret)

    return jwt
}
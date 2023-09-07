import CryptoJS from 'crypto-js';

export default function decryptAES(cryptoToken: string) {
    try {
        if (!cryptoToken) {
            throw new Error('não foi enviado token')
        }

        const decryptedToken = CryptoJS.AES.decrypt(
            cryptoToken,
            'secret key 751'
        ).toString(CryptoJS.enc.Utf8)

        if (!decryptedToken) {
            throw new Error('falha ao descriptografar')
        }

        return JSON.parse(decryptedToken)
    } catch (error) {
        return error
    }
}
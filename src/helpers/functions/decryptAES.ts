import CryptoJS from 'crypto-js';

export default function decryptAES(cryptoToken: string) {
    const decryptedToken = CryptoJS.AES.decrypt(
        cryptoToken,
        'secret key 751'
    ).toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedToken)
}
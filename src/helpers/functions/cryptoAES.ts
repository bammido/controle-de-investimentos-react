import CryptoJS from 'crypto-js';

export default function cryptoAES(token: any) {
    const cryptoToken = CryptoJS.AES.encrypt(JSON.stringify(token), 'secret key 751').toString()
    return cryptoToken
}
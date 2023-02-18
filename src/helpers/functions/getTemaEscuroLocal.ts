import decryptAES from "./decryptAES"

export default function getTemaEscuroLocal() {
    const cryptoTemaEscuro = localStorage.getItem('tema_escuro')

    const temaEscuro = decryptAES(cryptoTemaEscuro as string)

    return temaEscuro
}
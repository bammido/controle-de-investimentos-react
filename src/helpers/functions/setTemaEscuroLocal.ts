import cryptoAES from "./cryptoAES"

export default function setTemaEscuroLocal(value: string): void {
    const cryptoValue = cryptoAES(value)

    return localStorage.setItem('tema_escuro', cryptoValue as string)
}
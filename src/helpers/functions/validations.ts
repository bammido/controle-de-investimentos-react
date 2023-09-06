export function verificaSenhaPossuiUmaLetra(value: string | undefined) {
    return Number(value) ? false : true
}

export function verificaPossuiUmaLetraMaiuscula(value: string | undefined) {
    return value?.match(/[A-Z]/) ? true : false
}

export function verificaPossuiUmaLetraMinuscula(value: string | undefined) {
    return value?.match(/[a-z]/) ? true : false
}

export function verificaPossuiUmNumero(value: string | undefined) {
    return value?.match(/[0-9]/) ? true : false
}
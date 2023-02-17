
export default function formatDate(data: Date | string) {
    const dataFormatoDate = new Date(data)
    const mes = dataFormatoDate.getMonth()
    const dia = dataFormatoDate.getDay()
    const ano = dataFormatoDate.getFullYear()

    return `${dia < 10 ? `0${dia}` : dia} / ${mes < 10 ? `0${mes}` : mes} / ${ano}`
}
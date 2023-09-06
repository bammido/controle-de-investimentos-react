
export default function formatDate(data: Date | string) {
    const dataFormatoDate = new Date(data)
    console.log({ dataFormatoDate, data })
    const mes = dataFormatoDate.getMonth() + 1
    const dia = dataFormatoDate.getDate()
    const ano = dataFormatoDate.getFullYear()

    return `${dia < 10 ? `0${dia}` : dia} / ${mes < 10 ? `0${mes}` : mes} / ${ano}`
}
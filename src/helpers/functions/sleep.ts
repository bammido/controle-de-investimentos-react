export default async function sleep(milisegundos: number) {
    return await new Promise(resolve => setTimeout(resolve, milisegundos))
}
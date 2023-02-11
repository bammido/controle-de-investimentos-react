export function onChangeFormikToUpperCase(e: React.ChangeEvent<any>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void, field: string) {
    const { value } = e.target
    setFieldValue(field, value.toUpperCase())
}

export function toUpperCase(value: string) {
    return value.toUpperCase()
}

export function toLowerCase(value: string) {
    return value.toLowerCase()
}

export function somenteUmEspacoEntrePalavras(value: string) {
    return value.replaceAll('  ', ' ')
}

export function transformValue(config: { transformers: Array<(value: string) => string>, value: string }) {
    const { transformers, value } = config

    let newValue = value

    for (const trasnformer of transformers) {
        newValue = trasnformer(newValue)
    }

    return newValue
}
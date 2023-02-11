import * as yup from 'yup'

export type InitialValuesType = {
    dataDaCompra: Date,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string
}

export const initialValues: InitialValuesType = {
    dataDaCompra: new Date(),
    preco: 10,
    qtd: 10,
    corretora: 'teste',
    papel: 'teste'
}

export const validation = yup.object().shape({
    preco: yup.number().required('Campo obrigatório')
        .positive('O preço tem que ser um valor postivo maior que 0!'),

    qtd: yup.number().required('Campo obrigatório')
        .positive('A qtd tem que ser um valor postivo maior que 0!'),

    corretora: yup.string().required('Campo obrigatório'),
    dataDaCompra: yup.date().required('Campo obrigatório'),
    papel: yup.string().required('Campo obrigatório'),
});
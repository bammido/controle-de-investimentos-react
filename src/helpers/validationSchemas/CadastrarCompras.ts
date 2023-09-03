import * as yup from 'yup'

export type InitialValuesType = {
    data: Date,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string,
    tipoMovimentacao: string
}

export const initialValues: InitialValuesType = {
    data: new Date(),
    preco: 0,
    qtd: 0,
    corretora: '',
    papel: '',
    tipoMovimentacao: ''
}

export const validation = yup.object().shape({
    preco: yup.number().required('Campo obrigatório')
        .test(
            'positivoMaiorQueZero',
            'O preço tem que ser um valor postivo!',
            (value) => (value as number) >= 0
        ),

    qtd: yup.number().required('Campo obrigatório')
        .positive('A qtd tem que ser um valor postivo maior que 0!'),

    corretora: yup.string().required('Campo obrigatório'),
    data: yup.date().required('Campo obrigatório'),
    papel: yup.string().required('Campo obrigatório'),
    tipoMovimentacao: yup.string().required('Campo obrigatório')
});

export const edicaoValidation = yup.object().shape({
    preco: yup.number()
        .test(
            'positivoMaiorQueZero',
            'O preço tem que ser um valor postivo!',
            (value) => (value as number) >= 0
        ),

    qtd: yup.number()
        .positive('A qtd tem que ser um valor postivo maior que 0!'),

    corretora: yup.string(),
    data: yup.date(),
    papel: yup.string(),
    tipoMovimentacao: yup.string()
});
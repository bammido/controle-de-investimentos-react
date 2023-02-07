import * as yup from 'yup'

export type InitialValuesType = {
    papel: string,
    nome: string,
    tipoDeRenda: string,
    tipoDeInvestimento: string,
    taxasIncidentes: []
}

export const initialValues: InitialValuesType = {
    papel: 'teste',
    nome: '',
    tipoDeInvestimento: '',
    tipoDeRenda: '',
    taxasIncidentes: []
}

export const validation = yup.object().shape({
    tipoDeRenda: yup.string().required('Campo obrigatório'),
    tipoDeInvestimento: yup.string().required('Campo obrigatório'),
    papel: yup.string().required('Campo obrigatório'),
    nome: yup.string().required('Campo obrigatório'),
    taxasIncidentes: yup.array().of(yup.object())
});
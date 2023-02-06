import * as yup from 'yup'

export type InitialValuesType = {
    email: string,
    password: string,
}

export const initialValues: InitialValuesType = {
    email: '',
    password: '',
}

export const validation = yup.object().shape({
    email: yup.string().email('deve ser um email válido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
});

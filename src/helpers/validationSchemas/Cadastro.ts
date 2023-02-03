import * as yup from 'yup'

export type InitialValuesType = {
    email: string,
    password: string,
    repetePassword: string,
    nome: string
}

export const initialValues: InitialValuesType = {
    email: '',
    password: '',
    repetePassword: '',
    nome: ''
}

export const validation = yup.object().shape({
    email: yup.string().email('deve ser um email válido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório').min(8, 'a senha deve conter pelo menos 8 caracteres'),
    repetePassword: yup.string().required('Campo obrigatório').oneOf([yup.ref('password')], 'senhas devem coincidir'),
    nome: yup.string().required('Campo obrigatório'),
});

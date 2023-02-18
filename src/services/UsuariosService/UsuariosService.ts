import { AxiosError } from 'axios'
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

type Cadastrar = {
    email: string,
    password: string,
    nome: string
}

type Logar = {
    email: string,
    password: string,
}

class UsuariosService {
    async cadastrar(data: Cadastrar) {
        try {
            const res = await apiInvestimentos.post('/usuario', data)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async logar(data: Logar) {
        try {
            const res = await apiInvestimentos.post('/usuario/login', data)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }
}

export default new UsuariosService()
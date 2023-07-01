import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

type Cadastrar = {
    nome: string,
}
class CorretoraService {
    async cadastrar(data: Cadastrar) {
        try {
            const res = await apiInvestimentos.post('/corretora', data)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async pegarPapeis() {
        try {
            const res = await apiInvestimentos.get('/corretora')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de get todas corretoras', { cause: error.response })
        }
    }
}

export default new CorretoraService()
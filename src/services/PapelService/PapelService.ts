import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

type Cadastrar = {
    papel: string,
    nome: string,
    tipoDeRenda: string,
    tipoDeInvestimento?: string | null
}
class PapelService {
    async cadastrar(data: Cadastrar) {
        try {
            const res = await apiInvestimentos.post('/papel', data)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async pegarPapeis() {
        try {
            const res = await apiInvestimentos.get('/papel')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastrar papel', { cause: error.response })
        }
    }

    async editar(id: string, payload: Cadastrar) {
        try {
            const res = await apiInvestimentos.put(`/papel/${id}`, payload)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de editar papel', { cause: error.response })
        }
    }

    async getCotacaoVarios(papeis: string[]) {
        try {
            const res = await apiInvestimentos.post(`/papel/cotacao-recente/varios`, { papeis })

            return res
        } catch (error: AxiosError | Error | any) {
            return ({ errorMessage: 'Erro na requisição de pegar cotações', cause: error.response })
        }
    }
}

export default new PapelService()
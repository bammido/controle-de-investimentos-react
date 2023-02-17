import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

type Cadastrar = {
    dataDaCompra: Date,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string,
    tipoMovimentacao: string,
    userId: string
}

class MovimentacoesService {
    async cadastrar(data: Cadastrar) {
        try {
            const res = await apiInvestimentos.post('/movimentacao', data)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async pegarMovimentacoes() {
        try {
            const res = await apiInvestimentos.get('/movimentacao')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }
}

export default new MovimentacoesService()
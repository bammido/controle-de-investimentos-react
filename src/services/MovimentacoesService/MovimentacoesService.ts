import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

type Cadastrar = {
    data: Date,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string,
    tipoMovimentacao: string,
    userId: string
}

type Editar = {
    data: Date,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string,
    tipoMovimentacao: string,
}

export type Movimentacao = {
    data: Date | string,
    preco: number,
    qtd: number,
    corretora: string,
    papel: string,
    tipoMovimentacao: string,
    userId: string,
    id: string
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
            const res = await apiInvestimentos.get<Movimentacao[]>('/movimentacao')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async pegarMovimentacoesDoUsuario(id: string) {
        try {
            const res = await apiInvestimentos.get<Movimentacao[]>(`/movimentacao/${id}`)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de cadastro', { cause: error.response })
        }
    }

    async editar(id: string, payload: Editar) {
        try {
            const res = await apiInvestimentos.put<Movimentacao>(`/movimentacao/${id}`, payload)

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de editar movimentação', { cause: error.response })
        }
    }
}

export default new MovimentacoesService()
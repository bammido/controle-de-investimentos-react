import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

class TipoDeInvestimentoService {
    async pegarInvestimentos() {
        try {
            const res = await apiInvestimentos.get('/tipo-de-investimento')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de investimento', { cause: error.response })
        }
    }
}

export default new TipoDeInvestimentoService()
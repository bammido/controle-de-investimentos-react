import { AxiosError } from "axios"
import { apiInvestimentos } from "../apiInvestimentos/apiInvestimentos"

class TipoDeRendaService {
    async pegarRendas() {
        try {
            const res = await apiInvestimentos.get('/tipo-de-renda')

            return res
        } catch (error: AxiosError | Error | any) {
            throw new Error('Erro na requisição de investimento', { cause: error.response })
        }
    }
}

export default new TipoDeRendaService()
class PapelServiceMakePayload {

    cadastrar(papel: string, nome: string, tipoDeRenda: string, tipoDeInvestimento: string | undefined, taxasIncidentes: string | undefined | null) {
        return { papel, nome, tipoDeRenda, tipoDeInvestimento, taxasIncidentes }
    }

    logar(email: string, password: string) {
        return { email, password }
    }
}

export default new PapelServiceMakePayload()
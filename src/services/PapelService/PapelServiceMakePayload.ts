class PapelServiceMakePayload {

    cadastrar(papel: string, nome: string, tipoDeRenda: string, tipoDeInvestimento: string | undefined) {

        return { papel, nome, tipoDeRenda, tipoDeInvestimento: tipoDeInvestimento ? tipoDeInvestimento : null }
    }

    editar(papel: string, nome: string, tipoDeRenda: string, tipoDeInvestimento: string | undefined) {
        return { papel, nome, tipoDeRenda, tipoDeInvestimento }
    }

}

export default new PapelServiceMakePayload()
class PapelServiceMakePayload {

    cadastrar(papel: string, nome: string, tipoDeRenda: string, tipoDeInvestimento: string | undefined, taxasIncidentes: string | undefined | null) {
        return { papel, nome, tipoDeRenda, tipoDeInvestimento, taxasIncidentes }
    }

    editar(papel: string, nome: string, tipoDeRenda: string, tipoDeInvestimento: string | undefined, taxasIncidentes: string | undefined | null) {
        return { papel, nome, tipoDeRenda, tipoDeInvestimento, taxasIncidentes }
    }

}

export default new PapelServiceMakePayload()
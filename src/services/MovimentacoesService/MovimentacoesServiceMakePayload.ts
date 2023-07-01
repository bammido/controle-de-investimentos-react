class MovimentacoesServiceMakePayload {

    cadastrar(data: Date,
        preco: number,
        qtd: number,
        corretora: string,
        papel: string,
        tipoMovimentacao: string,
        userId: string) {
        return { papel, data, preco, qtd, corretora, tipoMovimentacao, userId }
    }

}

export default new MovimentacoesServiceMakePayload()
class MovimentacoesServiceMakePayload {

    cadastrar(dataDaCompra: Date,
        preco: number,
        qtd: number,
        corretora: string,
        papel: string,
        tipoMovimentacao: string,
        userId: string) {
        return { papel, dataDaCompra, preco, qtd, corretora, tipoMovimentacao, userId }
    }

}

export default new MovimentacoesServiceMakePayload()
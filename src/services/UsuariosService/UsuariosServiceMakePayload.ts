class UsuarioServiceMakePayload {

    cadastrar(email: string, password: string, nome: string) {
        return { email, password, nome }
    }

    logar(email: string, password: string) {
        return { email, password }
    }
}

export default new UsuarioServiceMakePayload()
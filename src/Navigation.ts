import { useNavigate } from "react-router-dom";

export default function Navigation(){
    const navigation = useNavigate()

    function goToHome(){
        navigation('/')    
    }

    function goToCadastrarMovimentacoes() {
        navigation('/controle/cadastrar-movimentacoes')
    }

    function goToVerMovimentacoes() {
        navigation('/controle/ver-movimentacoes')
    }

    function goToVerPapeis() {
        navigation('/controle/ver-papeis')
    }

    function goToCadastrarPapel() {
        navigation('/controle/cadastrar-papel')
    }

    function goToLogin() {
        navigation('/login')
    }

    function goToCadastrarUsuario() {
        navigation('/cadastrar-usuario')
    }

    return {
        goToHome,
        goToCadastrarMovimentacoes,
        goToVerMovimentacoes,
        goToVerPapeis,
        goToLogin,
        goToCadastrarUsuario,
        goToCadastrarPapel,

    }
}
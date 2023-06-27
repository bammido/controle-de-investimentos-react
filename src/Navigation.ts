import { useNavigate } from "react-router-dom";

export default function Navigation(){
    const navigation = useNavigate()

    function goToHome(){
        navigation('/')    
    }

    function goToCadastrarMovimentacoes() {
        navigation('cadastrar-movimentacoes')
    }

    function goToVerMovimentacoes() {
        navigation('ver-movimentacoes')
    }

    function goToVerPapeis() {
        navigation('ver-papeis')
    }

    function goToCadastrarPapel() {
        navigation('cadastrar-papel')
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
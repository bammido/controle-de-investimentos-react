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

    function goToVerInvestimentos(){
        navigation('ver-investimentos')
    }

    function goToCadastrarInvestimentos() {
        navigation('cadastrar-investimentos')
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
        goToVerInvestimentos,
        goToLogin,
        goToCadastrarUsuario,
        goToCadastrarInvestimentos,

    }
}
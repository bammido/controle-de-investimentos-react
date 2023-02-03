import { useNavigate } from "react-router-dom";

export default function Navigation(){
    const navigation = useNavigate()

    function goToHome(){
        navigation('/')    
    }

    function goToCadastrarInvestimentos(){
        navigation('cadastrar-investimentos')
    }
   
    function goToVerInvestimentos(){
        navigation('ver-investimentos')
    }

    function goToLogin() {
        navigation('/login')
    }

    function goToCadastrarUsuario() {
        navigation('/cadastrarUsuario')
    }

    return {
        goToHome,
        goToCadastrarInvestimentos,
        goToVerInvestimentos,
        goToLogin,
        goToCadastrarUsuario
    }
}
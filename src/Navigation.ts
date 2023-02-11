import { useNavigate } from "react-router-dom";

export default function Navigation(){
    const navigation = useNavigate()

    function goToHome(){
        navigation('/')    
    }

    function goToCadastrarCompras() {
        navigation('cadastrar-compras')
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
        goToCadastrarCompras,
        goToVerInvestimentos,
        goToLogin,
        goToCadastrarUsuario,
        goToCadastrarInvestimentos
    }
}
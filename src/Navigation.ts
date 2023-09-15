import { useNavigate } from "react-router-dom";
import { controle, ferramentasUteis } from "./constants/rotas";

export default function Navigation(){
    const navigation = useNavigate()

    function goToHome(){
        navigation('/')    
    }

    function goToControle() {
        navigation(`/controle/`)
    }

    function goToCadastrarMovimentacoes() {
        navigation(`/controle/${controle.cadastrarMovimentacao}`)
    }

    function goToVerMovimentacoes() {
        navigation(`/controle/${controle.verMovimentacoes}`)
    }

    function goToVerPapeis() {
        navigation(`/controle/${controle.verPapeis}`)
    }

    function goToCadastrarPapel() {
        navigation(`/controle/${controle.cadastrarPapel}`)
    }

    function goToLogin() {
        navigation('/login')
    }

    function goToCadastrarUsuario() {
        navigation('/cadastrar-usuario')
    }

    function goToPainelDeAnalise() {
        navigation('/painel-de-analise/')
    }

    function goToPainelDeAnaliseVisaoGeral() {
        navigation('/painel-de-analise/visao-geral')
    }

    function goToFerramentasUteis() {
        navigation('/ferramentas-uteis/')
    }

    function goToFerramentasUteisCalculadoraJurosCompostos() {
        navigation(`/ferramentas-uteis/${ferramentasUteis.caculadoraDeJurosCompostos}`)
    }

    return {
        goToHome,
        goToCadastrarMovimentacoes,
        goToVerMovimentacoes,
        goToVerPapeis,
        goToLogin,
        goToCadastrarUsuario,
        goToCadastrarPapel,
        goToPainelDeAnaliseVisaoGeral,
        goToControle,
        goToPainelDeAnalise,
        goToFerramentasUteis,
        goToFerramentasUteisCalculadoraJurosCompostos

    }
}
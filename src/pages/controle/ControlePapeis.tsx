import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../../Components/NavBar";
import { ControlePageWrapper, BarraDeNavegacaoDiv, OutLetDiv } from "./style";
import Navigation from "../../Navigation";
import { useState } from "react";


export default function ControlePapeis() {

    const { goToCadastrarMovimentacoes, goToVerPapeis, goToCadastrarPapel, goToVerMovimentacoes, goToControle } = Navigation()

    const [telas] = useState([
        { label: 'Cadastrar Papel', icon: 'pi pi-plus', action: goToCadastrarPapel, id: "cadastrar-papel" },
        { label: 'Ver papeis', icon: 'pi pi-chart-line', action: goToVerPapeis, id: "ver-papeis" },
        { label: 'Cadastrar Movimentação', icon: 'pi pi-cart-plus', action: goToCadastrarMovimentacoes, id: "cadastrar-movimentacao" },
        { label: 'Ver Movimentações', icon: 'pi pi-shopping-cart', action: goToVerMovimentacoes, id: "ver-movimentacoes" },
        { label: 'Infos', icon: 'pi pi-question-circle', action: goToControle, id: "" },

    ])

    return <ControlePageWrapper>
        <OutLetDiv>
            <Outlet />
        </OutLetDiv>
        <BarraDeNavegacaoDiv>
            <BarraDeNavegacao
                telas={telas}
            />
        </BarraDeNavegacaoDiv>
    </ControlePageWrapper>
}
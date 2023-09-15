import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../../Components/NavBar";
import { ControlePageWrapper, BarraDeNavegacaoDiv, OutLetDiv } from "./style";
import Navigation from "../../Navigation";
import { useState } from "react";


export default function FerramentasUteis() {

    const { goToFerramentasUteisCalculadoraJurosCompostos } = Navigation()

    const [telas] = useState([
        { label: 'Calculadora de Juros Compostos', icon: 'pi pi-calculator', action: goToFerramentasUteisCalculadoraJurosCompostos, id: "cadastrar-papel" },
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
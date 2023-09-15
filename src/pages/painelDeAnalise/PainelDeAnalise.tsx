import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../../Components/NavBar";
import { PainelDeAnalisePageWrapper, BarraDeNavegacaoDiv, OutLetDiv } from "./style";
import Navigation from "../../Navigation";
import { useState } from "react";

export default function PainelDeAnalise() { 

    const { goToPainelDeAnaliseVisaoGeral, goToPainelDeAnalise } = Navigation()

    const [telas] = useState([
        { label: 'Visão Geral', icon: 'pi pi-plus', action: goToPainelDeAnaliseVisaoGeral, id: "visao-geral" },
        { label: 'Infos', icon: 'pi pi-question-circle', action: goToPainelDeAnalise, id: "" },
    ])

    return <PainelDeAnalisePageWrapper>
        <OutLetDiv>
            <Outlet />
        </OutLetDiv>
        <BarraDeNavegacaoDiv>
            <BarraDeNavegacao
                telas={telas}
            />
        </BarraDeNavegacaoDiv>
    </PainelDeAnalisePageWrapper>
}
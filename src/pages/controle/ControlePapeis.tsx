import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../../Components/NavBar";
import { ControlePageWrapper, BarraDeNavegacaoDiv, OutLetDiv } from "./style";


export default function ControlePapeis() {
    return <ControlePageWrapper>
        <OutLetDiv>
            <Outlet />
        </OutLetDiv>
        <BarraDeNavegacaoDiv>
            <BarraDeNavegacao />
        </BarraDeNavegacaoDiv>
    </ControlePageWrapper>
}
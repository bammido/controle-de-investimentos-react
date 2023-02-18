import { useContext } from "react";
import { globalContext, GlobalMethodsType, GlobalStatesType } from "../../Contexts/GlobalContext";
import { MudaTemaButtonWrapper, MudaTemaButton } from "./style";

export default function MudaTemaButtonComponent() {

    const { states, methods } = useContext(globalContext)

    const { temaEstaEscuro } = states as GlobalStatesType
    const { mudaTema } = methods as GlobalMethodsType

    return <MudaTemaButtonWrapper>
        <MudaTemaButton
            icon={`pi ${temaEstaEscuro ? 'pi-sun' : 'pi-moon'}`}
            onClick={() => mudaTema(!temaEstaEscuro)}
        />
    </MudaTemaButtonWrapper>
}
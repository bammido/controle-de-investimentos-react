import styled from "styled-components";
import { colors, display } from "../../../theme/Theme";

export const PageWrapper = styled.div`
    padding: 5vh 5vw;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const SubSection = styled.div`
    margin: 5vh 0;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const CalculadoraDiv = styled.div`
    width: 100%;
    display: flex;

    justify-content: center;

    margin: 5vh 0;
    
    & > div {
        margin: 0 2.5vw;
    }

    @media (${display.Tablets["max-width"]}){
        flex-direction: column;
    }
`

export const CalculadoraCampos = styled.div`
    border: 4px solid ${colors.blue};
    padding: 1rem 2rem;

    min-width: 350px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CamposCalculadora = styled.div`
    display: flex; 
    flex-direction: column;
    flex-grow: 1;

    @media (${display.Mobile["max-width"]}) {
        & > div {
            display: flex;
            flex-direction: column;
        } 
    }
`

export const ResultadoResumidoDiv = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    
    border-radius: 5px;

    padding: 0.5rem 1rem;

    & h2 {
        margin: 5% 0;
        border-bottom: 1px solid white;
        padding-bottom: 1rem;
        color: ${props => props.theme.pallete.primary.contrastText};
    
        @media (${display.Tablets["max-width"]}){
            text-align: center;
            margin: 5% auto;
        }
    }
`
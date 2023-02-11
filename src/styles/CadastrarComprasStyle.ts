import styled from "styled-components";
import { display } from "../theme/Theme";

export const Titulo = styled.h1`
    text-align: center;
    margin: 5vh 0; 
`

export const FormInputsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3vh 2vw;

    @media (${display.Mobile["max-width"]}){
        align-items: center;
        flex-grow: 1;
    }
`

export const CadastrarComprasForm = styled.form`
    padding: 5vh 5vw;

    @media (${display.Mobile["max-width"]}){
        flex-direction: column;
        align-items: center;
    }
`

export const InputLabel = styled.label`
    margin-bottom: 1vh;
`

export const ErrorMessageSpan = styled.span`
    color: red;
    word-break: break-all;
`

export const SubmitDiv = styled.div`
    display: flex;
    justify-content: end;

    @media (${display.Mobile["max-width"]}){
        justify-content: center;
    }
`
import styled from "styled-components";
import { display } from "../theme/Theme";

export const Titulo = styled.h1`
    text-align: center;
    margin: 5vh 0; 

    color: ${props => props.theme.pallete.primary.contrastText};
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
    margin-bottom: 2vh;
    font-weight: 700;

    color: ${props => props.theme.pallete.primary.contrastText};
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

export const FieldSetStyled = styled.div`
    border: 1px solid ${props => props.theme.pallete.primary.contrastText};
    padding: 5vh 5vw;

    display: flex;
    flex-direction: column;

    &>div{
        display: flex;
        flex-direction: column;

        margin-bottom: 5vh;
    }
`
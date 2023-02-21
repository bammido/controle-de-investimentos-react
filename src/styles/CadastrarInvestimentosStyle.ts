import styled from "styled-components";
import InputNumber from "../Components/InputNumber";
import { display } from "../theme/Theme";
import { CadastrarComprasForm, Titulo as TituloCadastrarCompras, FormInputsWrapper as FormInputsWrapperCadastrarCompras, InputWrapper as InputWrapperCadastrarCompras, InputLabel as InputLabelCadastrarCompras, SubmitDiv as SubmitDivCadastrarCompras, ErrorMessageSpan as ErrorMessageSpanCadastrarCompras } from "./CadastrarComprasStyle";

const laptopMinDisplay = display.Laptops["min-width"]

export const Titulo = styled(TituloCadastrarCompras)``

export const CadastrarInvestimentosForm = styled(CadastrarComprasForm)``

export const FormInputsWrapper = styled(FormInputsWrapperCadastrarCompras)``

export const InputWrapper = styled(InputWrapperCadastrarCompras)``

export const InputLabel = styled(InputLabelCadastrarCompras)``

export const SubmitDiv = styled(SubmitDivCadastrarCompras)``

export const ErrorMessageSpan = styled(ErrorMessageSpanCadastrarCompras)``

export const InputTaxasLabel = styled(InputLabel)`
    color: green;
`

export const SubTitulo = styled.h2`
    text-align: center;
    margin: 5vh 0; 

    color: ${props => props.theme.pallete.primary.contrastText};
`

export const InputstaxasWrapper = styled(FormInputsWrapper)`
    &>div{
        display: flex; 
        align-items: center;
    }
    @media screen and (${laptopMinDisplay}){
        height: 18vh;
        justify-content: center;
        color: lightgreen;
        margin-bottom: 15px;
        z-index: 100;   
    }
`

export const Span = styled.span`
    font-size: 1.5em;
`

export const InputPrefixado = styled(InputNumber)`

    & .p-inputtext{
        border-radius: 16px;
    }
`

export const InputPrefixadoCloseIcon = styled.i`
    &:hover{
        cursor: pointer;
    }
`
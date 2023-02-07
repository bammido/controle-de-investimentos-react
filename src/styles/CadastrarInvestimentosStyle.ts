import styled from "styled-components";
import { CadastrarComprasForm, Titulo as TituloCadastrarCompras, FormInputsWrapper as FormInputsWrapperCadastrarCompras, InputWrapper as InputWrapperCadastrarCompras, InputLabel as InputLabelCadastrarCompras, SubmitDiv as SubmitDivCadastrarCompras, ErrorMessageSpan as ErrorMessageSpanCadastrarCompras } from "./CadastrarComprasStyle";

export const Titulo = styled(TituloCadastrarCompras)``

export const CadastrarInvestimentosForm = styled(CadastrarComprasForm)``

export const FormInputsWrapper = styled(FormInputsWrapperCadastrarCompras)``

export const InputWrapper = styled(InputWrapperCadastrarCompras)`
    width: 200px;
`

export const InputLabel = styled(InputLabelCadastrarCompras)``

export const SubmitDiv = styled(SubmitDivCadastrarCompras)``

export const ErrorMessageSpan = styled(ErrorMessageSpanCadastrarCompras)``

export const InputTaxasLabel = styled(InputLabel)`
    color: green;
`

export const SubTitulo = styled.h2`
    text-align: center;
    margin: 5vh 0; 
`
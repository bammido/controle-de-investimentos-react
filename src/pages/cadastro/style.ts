import styled from "styled-components";
import { LoginFormStyled, InputLabel as InputLabelLogin, LoginPageWrapper, InputDiv as InputDivLogin, NavButtonDiv as NavButtonDivLogin } from "../login/style";
import { ErrorMessageSpan as ErrorMessageSpanCadastroInvestimentos } from '../controle/cadastrarMovimentacoes/style'

export const CadastroFormStyled = styled(LoginFormStyled)``

export const InputLabel = styled(InputLabelLogin)``

export const CadastroPageWrapper = styled(LoginPageWrapper)``

export const InputDiv = styled(InputDivLogin)``

export const ErrorMessageSpan = styled(ErrorMessageSpanCadastroInvestimentos)``

export const NavButtonDiv = styled(NavButtonDivLogin)``

export const ContentCadastroDIv = styled.div`
    display: flex; 
    flex-direction: column;
`
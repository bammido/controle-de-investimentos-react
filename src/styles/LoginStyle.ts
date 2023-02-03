import styled from "styled-components";
import Button from "../Components/Button";
import { colors } from '../theme/Theme'

export const LoginPageWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InputLabel = styled.label`
    margin-bottom: 1vh;
    align-self: flex-start;

    font-size: large;
    font-weight: 700;
`

export const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 3vh 0;
`

export const NavButtonDiv = styled.div`
    margin-top: 3vh;
`
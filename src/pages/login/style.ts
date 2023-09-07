import styled from "styled-components";
import { display } from "../../theme/Theme";

export const LoginPageWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.pallete.primary.main};

`

export const LoginFormStyled = styled.form`
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

    color: ${props => props.theme.pallete.primary.contrastText};
`

export const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 3vh 0;
`

export const NavButtonDiv = styled.div`
    margin-top: 3vh;
    align-self: center;
`

export const LogoImg = styled.img`
    width: 100%; 
    height: 100px;
    margin-bottom: 3vh; 
`

export const DividerVerticalDiv = styled.div`
    @media (${display.Tablets["max-width"]}){
        display: none;
    }
`

export const DividerHorizontalDiv = styled.div`
    margin-top: 3vh;
    @media (${display.Tablets["min-width"]}){
        display: none;
    }
`

export const ContentDiv = styled.div`
    display: flex;

    @media (${display.Tablets["max-width"]}){
        flex-direction: column;
    }
`


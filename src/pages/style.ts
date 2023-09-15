import styled from "styled-components";
import { colors } from "../theme/Theme";

export const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;

    background-color: ${props => props.theme.pallete.primary.main};
`

export const OutLetDiv = styled.div`
    flex-grow: 1;
`

export const NotFoundContentDIv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.pallete.primary.main};

    display: flex;
    align-items: center;
    justify-content: center;

    & > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
    }
    
    & > div:last-child {
        display: flex; 
        flex-direction: column; 
        align-items: center;

        & > div {
            margin-top: 3vh;
        }
        
        & > h1 {
            text-align: center;
        }
    }
`
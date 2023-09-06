import styled from "styled-components";
import { colors } from "../theme/Theme";

export const PageWrapler = styled.div`
    padding: 5vh 5vw;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    h1, h2, h3{
        text-align: center;
        margin: 5vh 0; 
    }
`

export const SubSection = styled.div`
    margin-bottom: 10vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FiltrosGraficoDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const FiltrosGraficoOption = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3vh;

    border: 4px solid ${colors.blue};
    border-radius: 5px;

    padding: 1rem 2rem;

    & > span {
        width: 100px;
        margin-right: 2rem;
        font-weight: bold;

    }
`

export const FiltrosGraficoRadioOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    & > div {
        margin-right: 1rem;
        margin-bottom: 0.5rem;
        margin-top: 0.5rem;
        
        & > label {
            font-size: 12px;
            word-break: normal;
            margin-left: 0.5rem;
        }
    }
`

export const InfosPapel = styled.div`
    &:hover{
        transform: scale(1.02);
    }

    margin: 1vh 0;
    margin-right: 2vw;
    min-width: 300px;
    background-color: ${colors.darkPurple};
    
    border-radius: 5px;

    padding: 0.5rem 1rem;

    & > h3 {
        color: ${colors.white} !important;
    }

    & > div {
        display: flex;
        flex-direction: column;

        justify-content: space-around;

        & > div {
            border-bottom: 1px solid ${props => props.theme.pallete.primary.contrastText};
            margin-bottom: 1rem;
            padding-bottom: 1rem;

            display: flex;
            justify-content: space-between;

            & > span {
                color: ${colors.white} !important;
            }

            &:last-of-type {
                border: none;
            }
        }
    }
`

export const GainLosssField = styled.div<{ gain: boolean }>`
    & > span {
        color: ${props => {
        console.log(props.gain)
        return props.gain ? colors.lightGreen : colors.scarlet
    }} !important;
    }

`

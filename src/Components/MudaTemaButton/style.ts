import styled from "styled-components"
import Button from "../Button"

export const MudaTemaButton = styled(Button)`
    width: 1rem;
    height: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;

    background-color: ${props => props.theme.pallete.colors.blackSmooth} !important;
`

export const MudaTemaButtonWrapper = styled.div`
    width: 100%; 
    position: absolute; 
    top: 0
`
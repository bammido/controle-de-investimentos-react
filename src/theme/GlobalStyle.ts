import { createGlobalStyle } from "styled-components";
import { fonts } from "./Theme";


export const GlobalStyle = createGlobalStyle`
    * {
        font-family: ${fonts.primary};
        margin: 0;
        padding: 0;
        transition: 300ms;
    }

    & .p-dialog .p-dialog-header{
        background: ${props => props.theme.pallete.primary.main} !important;
        color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .p-dialog .p-dialog-content{
        background: ${props => props.theme.pallete.primary.main} !important;
        color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .p-dialog .p-dialog-header .p-dialog-header-icon{
        color: ${props => props.theme.pallete.primary.contrastText};
    }
`
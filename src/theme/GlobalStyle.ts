import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "./Theme";


export const GlobalStyle = createGlobalStyle`
    * {
        font-family: ${fonts.primary};
        margin: 0;
        padding: 0;
        transition: 300ms;
        color: ${props => props.theme.pallete.primary.contrastText};
    }

    body::-webkit-scrollbar {
        display: none;
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

    & .p-datepicker table td > span{
        color: ${colors.black};
        font-weight: bold;
    }
    
    & .p-datepicker table td > .p-disabled{
        font-weight: 300;
    }

    & .p-datepicker-other-month .p-disabled{
        font-weight: 300;
    }

    & .pi-chevron-left:before, & .pi-chevron-right:before {
        color: ${colors.black};
    }

    & .p-divider .p-divider-content{
        background-color: ${props => props.theme.pallete.primary.main};
    }

    & .p-password-panel {
        background: ${props => props.theme.pallete.primary.main} !important;
    }

    & .p-toast-message-text > span, & .p-toast-message-text > div {
        color: ${colors.black};
    }

    & .p-toast-icon-close .pi-times:before{
        color: ${colors.black};
    }
`
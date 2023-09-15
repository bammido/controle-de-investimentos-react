import { createGlobalStyle } from "styled-components";
import { colors, fonts } from "./Theme";


export const GlobalStyle = createGlobalStyle<any>`
    * {
        font-family: ${fonts.primary};
        margin: 0;
        padding: 0;
        transition: 300ms;
        color: ${props => props.theme.pallete.primary.contrastText};
    }

    h1, h2, h3, h4, h5 {
        color: ${colors.lightWashedOrange};
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

    & .pi-chevron-left:before, .pi-chevron-right:before {
        color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link {
        background: ${props => props.theme.pallete.primary.main} !important;
        border-color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .p-accordion .p-accordion-header .p-accordion-header-link {
        background: ${props => props.theme.pallete.primary.main} !important;
        border-color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .p-accordion .p-accordion-content {
        background: ${props => props.theme.pallete.primary.main} !important;
        border-color: ${props => props.theme.pallete.primary.contrastText};
    }

    & .pi-chevron-left:before, .pi-chevron-right:before {
        color: ${colors.black};
    }

    & .p-datepicker .p-yearpicker .p-yearpicker-year {
        color: ${colors.black};
        font-weight: bold;
    }
    
    & .p-datepicker .p-yearpicker .p-yearpicker-year .p-yearpicker-year .p-disabled{
        font-weight: 300;
    }

    & .p-datepicker-decade span {
        color: ${colors.black};
        font-weight: bold;
    }
    
    & .p-monthpicker-month {
        color: ${colors.black};
        font-weight: bold;
    }
    
    & .p-monthpicker-month .p-disabled {
        font-weight: 300;
    }

    & .p-button-text .p-button-label {
        color: ${colors.black};
        font-weight: bold;
    }
`
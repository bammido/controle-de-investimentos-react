import styled from "styled-components";
import Button from "../Button";

export const SideBarNavigationWrapper = styled.div`
    width: 100%;
    position: sticky;
    top: 0;

`

export const SideBarWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: space-between;
`

export const SideBarNavigationShowButton = styled(Button)`
    top: 0;
    width: 1rem;
    height: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
    z-index: 100;
`

export const SideBarButtonsWrapper = styled.div`
    width: 100%;
    background-color: ${props => props.theme.pallete.primary.main} ;

    margin: 0.3rem 0;

    & button {
        width: 100%;
    }

    & .p-button .p-button-label {
        color: white !important;
    }
    
    & .p-button .p-button-icon {
        color: white !important;
    }

`

export const SideBarThemeButtom = styled(Button)`
    background-color: ${props => props.theme.pallete.colors.blackSmooth} !important;
    border-color: ${props => props.theme.pallete.colors.main};
`

export const SideBarNavButton = styled(Button) <{ bgcolor: string }>`
    background-color: ${props => props.bgcolor || props.theme.pallete.colors.blackSmooth} !important;
    border-color: ${props => props.bgcolor || props.theme.pallete.colors.blackSmooth};
`
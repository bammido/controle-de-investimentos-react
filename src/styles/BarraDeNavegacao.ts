import styled from "styled-components";

export const BarraDeNavegacaoWrapper = styled.div`
height: 10vh;
width: 100%; 
display: flex; 
justify-content: center;


    & .p-tabmenu .p-tabmenu-nav{
        background-color: ${props => props.theme.pallete.primary.main};
    }

    & .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link{
        background-color: ${props => props.theme.pallete.primary.main};

        &:hover{
            background-color: ${props => props.theme.pallete.primary.contrastText} !important;
            opacity: 0.7;
        }
    }


`
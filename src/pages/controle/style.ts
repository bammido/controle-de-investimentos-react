import styled from "styled-components";

export const ControlePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const BarraDeNavegacaoDiv = styled.div`
    border-top: 3px solid ${props => props.theme.pallete.colors.blue};
`

export const OutLetDiv = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    height: 90vh;
`
import styled from "styled-components";

export const ControlePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const BarraDeNavegacaoDiv = styled.div`
    background: ${props => props.theme.pallete.primary.main};
    border-top: 3px solid ${props => props.theme.pallete.colors.blue};
    position: sticky;
    bottom: 0;
`

export const OutLetDiv = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    height: 90vh;
`
import styled from "styled-components";

export const HomePageWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
min-height: 100vh;

background-color: ${props => props.theme.pallete.primary.main};
`

export const OutLetDiv = styled.div`
flex-grow: 1;
overflow-y: scroll;
max-height: 90vh;
`

export const BarraDeNavegacaoDiv = styled.div`
border-top: 3px solid ${props => props.theme.pallete.colors.blue};
`
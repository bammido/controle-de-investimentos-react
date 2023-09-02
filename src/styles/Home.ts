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
`
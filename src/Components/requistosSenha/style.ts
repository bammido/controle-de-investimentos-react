import styled from "styled-components";

export const RequisitoSenha = styled.li<{ valid: boolean }>`
    color: ${props => props.valid ? props.theme.pallete.green : props.theme.pallete.red};
`
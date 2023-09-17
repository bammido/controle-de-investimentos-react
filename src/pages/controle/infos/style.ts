import styled from "styled-components";
import {
    VerInvestimentosWrapper,
    Titulo as TituloStyled
} from '../VerPapeis/style'

export const InfosWrapper = styled(VerInvestimentosWrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & {
        text-align: center;
    }
`

export const Titulo = styled(TituloStyled)``

export const SubTitulo = styled.h2``

export const NavSpan = styled.span`
    font-weight: bold;

    &:hover {
        color: blueviolet;
        cursor: pointer;
    }
`
export const NavA = styled.a`
    font-weight: bold;
    text-decoration: none;

    &:hover {
        color: blueviolet;
        cursor: pointer;
    }
`

export const FeatureDescription = styled.p`
    margin: 2.5vh 0;
`

export const FeatureDiv = styled.div`
    margin: 5vh 0;
`

export const SectionDescription = styled.p`
    margin: 5vh 0;
`

export const FeatureDescriptionList = styled.li`
    text-align: start;
`

export const FeatureSubItulo = styled.h3`
    margin: 1vh 0;
`
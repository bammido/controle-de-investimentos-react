import Navigation from "../../../Navigation";
import { InfosWrapper, Titulo, SubTitulo, NavSpan, FeatureDiv, FeatureDescription, SectionDescription } from "./style";

export default function InfosControle() {
    const { goToPainelDeAnaliseVisaoGeral } = Navigation()

    return <InfosWrapper>
        <Titulo>Painel de Controle</Titulo>
        <SectionDescription>Nesta seção fica o contorle das ações e das movimentações da sua carteira.</SectionDescription>
        <FeatureDiv>
            <SubTitulo>Cadastrar Movimentações</SubTitulo>
            <FeatureDescription>Cadastrando as compras e vendas de cada ativo é possível visualizar detalhes da sua carteira no <NavSpan onClick={goToPainelDeAnaliseVisaoGeral}>painel de análise</NavSpan>.</FeatureDescription>
        </FeatureDiv>
        <FeatureDiv>
            <SubTitulo>Ver Movimentações</SubTitulo>
            <FeatureDescription>É possível Editar as movimentações em caso de algum erro.</FeatureDescription>
        </FeatureDiv>
    </InfosWrapper>
} 
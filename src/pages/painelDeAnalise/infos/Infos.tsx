import { InfosWrapper, Titulo, SubTitulo, FeatureSubItulo, FeatureDescriptionList, FeatureDiv, FeatureDescription, SectionDescription } from "../../controle/infos/style";

export default function InfosPainedDeAnalise() {

    return <InfosWrapper>
        <Titulo>Painel de Análise</Titulo>
        <SectionDescription>Seção de análise com informações mais detalhadas de cada ativo da carteira.</SectionDescription>
        <FeatureDiv>
            <SubTitulo>Visão Geral da Carteira</SubTitulo>
            <FeatureDescription>
                <ul>
                    <FeatureDescriptionList>Preço médio das ações</FeatureDescriptionList>
                    <FeatureDescriptionList>Qtd total de cada ativo em carteira</FeatureDescriptionList>
                    <FeatureDescriptionList>Total investido por ação</FeatureDescriptionList>
                    <FeatureDescriptionList>Visualização da distribuição da cartera com base no tipo de renda ou no tipo de investimento</FeatureDescriptionList>
                </ul>
                <FeatureSubItulo>Features Futuras:</FeatureSubItulo>
                <ul>
                    <FeatureDescriptionList>Cotação de hoje para cada ativo e visualização de Gain/Loss</FeatureDescriptionList>
                    <FeatureDescriptionList>previsão de retorno para investimentos de renda fixa</FeatureDescriptionList>
                </ul>
            </FeatureDescription>
        </FeatureDiv>
    </InfosWrapper>
}
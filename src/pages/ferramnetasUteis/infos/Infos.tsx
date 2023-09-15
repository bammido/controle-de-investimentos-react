import { InfosWrapper, Titulo, SubTitulo, FeatureSubItulo, FeatureDescriptionList, FeatureDiv, FeatureDescription, SectionDescription } from "../../controle/infos/style";

export default function InfosFerramentasUteis() {

    return <InfosWrapper>
        <Titulo>Ferramentas Úteis</Titulo>
        <SectionDescription>Utilidades para facilitar cálculos e previsões de investimentos.</SectionDescription>
        <FeatureDiv>
            <SubTitulo>Calculadora de Juros Compostos</SubTitulo>
            <FeatureDescription>
                <ul>
                    <FeatureDescriptionList>Visualização simplificada e detalhada dos resultados</FeatureDescriptionList>
                    <FeatureDescriptionList>Gráficos para comparação mês a mês</FeatureDescriptionList>
                </ul>
                <FeatureSubItulo>Features Futuras:</FeatureSubItulo>
                <ul>
                    <FeatureDescriptionList>Previsões de ganho com base em índices antesriores para investimentos baseados em taxas (SELIC, IPCA, CDI), OBS: será somente uma estimativa baseada em resultados anteriores e no valor atual do índice, podendo ou não representar efetivamente o resultado final.</FeatureDescriptionList>
                </ul>
            </FeatureDescription>
        </FeatureDiv>
    </InfosWrapper>
}
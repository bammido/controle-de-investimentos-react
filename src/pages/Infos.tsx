import Navigation from "../Navigation";
import { InfosWrapper, Titulo, SubTitulo, NavA, FeatureSubItulo, FeatureDescriptionList, FeatureDiv, FeatureDescription, SectionDescription } from "./controle/infos/style";

export default function InfosHome() {
    const { goToPainelDeAnaliseVisaoGeral } = Navigation()

    return <InfosWrapper>
        <Titulo>Controle de Investimentos</Titulo>
        <SectionDescription>A finalidade dessa aplicação é axiliar no controle, visualização e insights da sua carteira de investimentos unificando , e trazendo informações sobre, os ativos em um só lugar.</SectionDescription>
        <FeatureDiv>
            <SubTitulo>Features</SubTitulo>
            <FeatureDescription>
                <ul>
                    <FeatureDescriptionList><b>Controle de Investimentos:</b> cadastrar e unificar as movimentações da carteira</FeatureDescriptionList>
                    <FeatureDescriptionList><b>Painel de Análise:</b> Visão detalhada da carteira e seus ativos</FeatureDescriptionList>
                </ul>
            </FeatureDescription>
        </FeatureDiv>
        <FeatureDiv>
            <SubTitulo>Features Futuras</SubTitulo>
            <FeatureDescription>
                <ul>
                    <FeatureDescriptionList><b>Notícias:</b> últimas notícias e documentos oficiais sobre os ativos</FeatureDescriptionList>
                    <FeatureDescriptionList><b>Triggers:</b> poderão ser ajustados <b>triggers de compra</b> (envio de email quando um ativo atinge determinado valor), <b>triggers de queda</b> (avisa quando um ativo cai brucasmente em um período), entre outros.</FeatureDescriptionList>
                    <FeatureDescriptionList><b>proventos futuros:</b> resumo dos próximos proventos a serem recebidos.</FeatureDescriptionList>
                    <FeatureDescriptionList><b>dy:</b> Dividend yeld de cada ativo que paga proventos.</FeatureDescriptionList>
                </ul>
            </FeatureDescription>
        </FeatureDiv>
        <FeatureDiv>
            <SubTitulo>Github</SubTitulo>
            <FeatureDescription>
                <ul>
                    <FeatureDescriptionList><NavA href="https://github.com/bammido/controle-de-investimentos-react">front</NavA></FeatureDescriptionList>
                    <FeatureDescriptionList><NavA href="https://github.com/bammido/controle-de-investimentos-back">back</NavA></FeatureDescriptionList>
                </ul>
            </FeatureDescription>
        </FeatureDiv>
    </InfosWrapper>
}
import { useEffect, useState } from "react";
import { CalculadoraCampos, CalculadoraDiv, PageWrapper, SubSection, CamposCalculadora, ResultadoResumidoDiv } from "./style";
import InputNumber from "../../../Components/InputNumber";
import Dropdown from "../../../Components/Dropdown";
import { formatToBRL } from "../../../helpers/functions/formatCurrency";
import Button from "../../../Components/Button";
import GraficosResultados from "./components/GraficosResultados";

interface DadoTabela {
    totalInvestidoMes: number;
    rendimentoMes: number;
    totalRendimento: number;
    totalAcumulado: number;
}

export default function CalcuLadoraDeJurosCompostos() {
    const [valorInicial, setValorInicial] = useState<number | null>(null)
    const [aporte, setAporte] = useState<number | null>(null)
    const [taxa, setTaxa] = useState<number | null>(null)
    const [tipoPeriodoTaxa, setTipoPeriodoTaxa] = useState<"mes" | "ano">("mes")
    const [tipoPeriodoInvestimento, setTipoPeriodoInvestimento] = useState<"mes" | "ano">("mes")
    const [periodoInvestimento, setPeriodoInvestimento] = useState<number | null>(0)
    const [totalInvestido, setTotalInvestido] = useState<number>(0)
    const [totalRendimentos, setTotalRendimentos] = useState<number>(0)
    const [labels, setLabels] = useState<string[]>([])
    const [totalInvestidoData, setTotalInvestidoData] = useState<number[]>([])
    const [totalRendimentoData, setTotalRendimentoData] = useState<number[]>([])
    const [dadosTabela, setDadosTabela] = useState<DadoTabela[]>([])

    useEffect(() => {
        if ((!valorInicial && !aporte) || !taxa || !periodoInvestimento) {
            return
        }

        calculaJurosCompostos()
    }, [valorInicial, aporte, taxa, tipoPeriodoTaxa, periodoInvestimento, tipoPeriodoInvestimento])

    function retornaTaxaEquivalente(taxa: number, periodoDesejado: number, periodoAtual: number): number {
        return (((1 + taxa) ** (periodoDesejado / periodoAtual)) - 1)
    }

    function calculaJurosCompostos() {
        if ((!valorInicial && !aporte) || !taxa || !periodoInvestimento) {
            return
        }

        const periodoInvestimentoMensal = tipoPeriodoInvestimento === "mes" ? periodoInvestimento : periodoInvestimento * 12
        const taxaMensal = tipoPeriodoTaxa === "mes" ? taxa / 100 : retornaTaxaEquivalente(taxa / 100, 1, 12)
        const valorInicialAux = valorInicial ? valorInicial : 0
        const aportAux = aporte ? aporte : 0

        const totalAportes = aportAux * periodoInvestimentoMensal

        const resultado = (valorInicialAux * ((1 + taxaMensal) ** periodoInvestimentoMensal)) - valorInicialAux

        const rendimentoAportes = ((aportAux * (((1 + taxaMensal) ** periodoInvestimentoMensal) - 1)) / taxaMensal) - totalAportes

        const total = valorInicialAux + totalAportes

        setTotalRendimentos(Number((resultado + rendimentoAportes).toFixed(2)))
        setTotalInvestido(total)
    }

    function calculaVersaoDetalhada() {
        if ((!valorInicial && !aporte) || !taxa || !periodoInvestimento) {
            return
        }

        const periodoInvestimentoMensal = tipoPeriodoInvestimento === "mes" ? periodoInvestimento : periodoInvestimento * 12
        const taxaMensal = tipoPeriodoTaxa === "mes" ? taxa / 100 : retornaTaxaEquivalente(taxa / 100, 1, 12)
        const valorInicialAux = valorInicial ? valorInicial : 0
        const aportAux = aporte ? aporte : 0

        let totalAcumulado = valorInicialAux;
        let totalInvestidoMes = valorInicialAux;
        let totalRendimento = 0;

        const graficoBarraLabels: string[] = []
        const totalInvestidoGraficoBarraData: number[] = []
        const totalRendimentoGraficoBarraData: number[] = []
        const retorno: DadoTabela[] = [{ totalInvestidoMes, rendimentoMes: 0, totalRendimento, totalAcumulado }]

        for (let i = 0; i <= periodoInvestimentoMensal; i++) {
            if (i === 0) {
                continue
            }

            const rendimentoMes = (totalAcumulado * (1 + taxaMensal)) - totalAcumulado

            totalInvestidoMes += aportAux
            totalRendimento += rendimentoMes
            totalAcumulado += rendimentoMes + aportAux

            retorno.push({ totalInvestidoMes, rendimentoMes, totalRendimento, totalAcumulado })
            graficoBarraLabels.push(i.toString())
            totalInvestidoGraficoBarraData.push(totalInvestidoMes)
            totalRendimentoGraficoBarraData.push(totalRendimento)
        }

        setLabels(graficoBarraLabels)
        setTotalInvestidoData(totalInvestidoGraficoBarraData)
        setTotalRendimentoData(totalRendimentoGraficoBarraData)
        setDadosTabela(retorno)
    }

    return <PageWrapper>
        <h1>Calculadora de Juros Compostos</h1>
        <SubSection>
            <CalculadoraDiv>
                <CalculadoraCampos>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
                        <CamposCalculadora>
                            <label>Valor Inicial</label>
                            <InputNumber
                                locale="pt-BR"
                                mode="currency"
                                currency="BRL"
                                minFractionDigits={2}
                                placeholder="R$"
                                value={valorInicial}
                                onChange={e => setValorInicial(e.value)}
                            />
                        </CamposCalculadora>
                        <CamposCalculadora>
                            <label>Aporte Mensal</label>
                            <InputNumber
                                locale="pt-BR"
                                mode="currency"
                                currency="BRL"
                                minFractionDigits={2}
                                placeholder="R$"
                                value={aporte}
                                onChange={e => setAporte(e.value)}
                            />
                        </CamposCalculadora>
                        <CamposCalculadora>
                            <label>Taxa de Juros</label>
                            <div style={{ display: "flex" }}>
                                <InputNumber
                                    mode="decimal"
                                    minFractionDigits={2}
                                    suffix="%"
                                    value={taxa}
                                    onChange={e => setTaxa(e.value)}
                                />
                                <Dropdown
                                    style={{ flexGrow: 1 }}
                                    value={tipoPeriodoTaxa}
                                    options={[{ label: "Ao Mês", value: "mes" }, { label: "Ao Ano", value: "ano" }]}
                                    onChange={e => setTipoPeriodoTaxa(e.value)}
                                />
                            </div>
                        </CamposCalculadora>
                        <CamposCalculadora>
                            <label>Período</label>
                            <div style={{ display: "flex" }}>
                                <InputNumber
                                    value={periodoInvestimento}
                                    onChange={e => setPeriodoInvestimento(e.value)}
                                />
                                <Dropdown
                                    style={{ flexGrow: 1 }}
                                    value={tipoPeriodoInvestimento}
                                    options={[{ label: "Meses", value: "mes" }, { label: "Anos", value: "ano" }]}
                                    onChange={e => setTipoPeriodoInvestimento(e.value)}
                                />
                            </div>
                        </CamposCalculadora>
                    </div>
                </CalculadoraCampos>
                <ResultadoResumidoDiv>
                    <h2>Total Investido {formatToBRL(totalInvestido)}</h2>
                    <h2>Rendimentos {formatToBRL(totalRendimentos)}</h2>
                    <h2>Valor Total {formatToBRL(totalRendimentos + totalInvestido)}</h2>
                </ResultadoResumidoDiv>
            </CalculadoraDiv>
        </SubSection>
        <SubSection>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    onClick={calculaVersaoDetalhada}
                    label="ver versão detalhada"
                />
            </div>
            {!!totalRendimentoData.length &&
                !!totalInvestidoData.length &&
                !!labels.length &&
                totalInvestido &&
                totalRendimentos &&
                <GraficosResultados
                    totalRendimentoData={totalRendimentoData}
                    totalInvestidoData={totalInvestidoData}
                    labelsGraficoBarra={labels}
                    totalInvestido={totalInvestido}
                    totalRendimento={totalRendimentos}
                />}
        </SubSection>
    </PageWrapper>
}
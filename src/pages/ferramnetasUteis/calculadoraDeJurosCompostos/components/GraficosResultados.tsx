import { useState, useEffect, useContext } from "react"
import { Chart } from "primereact/chart";
import { GlobalStatesType, globalContext } from "../../../../Contexts/GlobalContext";
import { colors } from "../../../../theme/Theme";

interface Props {
    totalInvestidoData: number[];
    totalRendimentoData: number[];
    labelsGraficoBarra: string[];
    totalInvestido: number;
    totalRendimento: number;
}

export default function GraficosResultados({
    totalInvestidoData,
    totalRendimentoData,
    labelsGraficoBarra,
    totalInvestido,
    totalRendimento
}: Props) {

    const [mostraGraficos, setMostraGraficos] = useState<boolean>(false)

    const [stackedData, setStackedData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'bar',
            label: 'Dataset 1',
            backgroundColor: '#42A5F5',
            data: [
                50,
                25,
                12,
                48,
                90,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ]
        }]
    });

    const [chartData, setChartData] = useState({
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    });

    const [stackedOptions, setStackedOptions] = useState({
        maintainAspectRatio: false,
        aspectRatio: .8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    });

    const [lightOptions, setLightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    useEffect(() => {
        setStackedData(prev => {
            const datasets = [{ ...prev.datasets[0], data: totalInvestidoData, label: "Valor Investiido" }, { ...prev.datasets[1], data: totalRendimentoData, label: "Valor Juros" }]

            return { ...prev, labels: labelsGraficoBarra, datasets }
        })

        setChartData(prev => {
            return { ...prev, labels: ["Valor Investido", "Valor Juros"], datasets: [{ ...prev.datasets[0], data: [totalInvestido, totalRendimento] }] }
        })

        setTimeout(() => {
            setMostraGraficos(true)
        }, 200)
    }, [])

    useEffect(() => {

        setChartData(prev => {
            return { ...prev, labels: ["Valor Investido", "Valor Juros"], datasets: [{ ...prev.datasets[0], data: [totalInvestido, totalRendimento] }] }
        })
    }, [totalInvestido,
        totalRendimento])

    useEffect(() => {
        setStackedData(prev => {
            const datasets = [{ ...prev.datasets[0], data: totalInvestidoData, label: "Valor Investiido" }, { ...prev.datasets[1], data: totalRendimentoData, label: "Valor Juros" }]

            return { ...prev, labels: labelsGraficoBarra, datasets }
        })
    }, [totalInvestidoData,
        totalRendimentoData,
        labelsGraficoBarra,])

    const { states } = useContext(globalContext)
    const { temaEstaEscuro } = states as GlobalStatesType

    useEffect(() => {
        const cor = temaEstaEscuro ? colors.white : colors.lightBlue

        setLightOptions(prev => {
            const newState = { ...prev }
            newState.plugins.legend.labels.color = cor

            return newState
        })

        setStackedOptions(prev => {
            const newState = { ...prev }
            newState.plugins.legend.labels.color = cor
            newState.scales.x.ticks.color = cor
            newState.scales.y.ticks.color = cor

            return newState
        })
    }, [temaEstaEscuro])

    return <>
        {mostraGraficos && <div style={{ margin: "2vh 0", display: "flex", justifyContent: "center" }}>
            <Chart type="pie" data={chartData} options={lightOptions} />
        </div>}
        {mostraGraficos && <div style={{ margin: "2vh 0" }}>
            <Chart type="bar" data={stackedData} options={stackedOptions} />
        </div>}
    </>
}
import { useEffect, useRef, useState, useContext } from 'react';
import { Chart } from 'primereact/chart';
import { mensagemDeErro } from '../../../helpers/functions/Toast';
import { Toast } from '../../../Components/Toast/Toast';
import UsuariosService from '../../../services/UsuariosService/UsuariosService';
import getUserId from '../../../helpers/functions/getUserId';
import { GlobalStatesType, globalContext } from '../../../Contexts/GlobalContext';
import { colors } from '../../../theme/Theme';
import { PageWrapler, SubSection } from './style';
import PapelService from '../../../services/PapelService/PapelService';
import InfosPapelPainel from './components/infosPapelPainel/InfosPapelPainel';
import FiltrosGrafico from './components/filtrosgrafico/FiltrosGrafico';
import SemMovimentacoes from './components/semMovimentacoes/SemMovimentacoes';
import sleep from '../../../helpers/functions/sleep';

export interface PapeisInfos {
    precoMedio: number;
    totalInvestido: number;
    totalVendido: number;
    qtdAtual: number;
    qtdTotal: number;
    papel: string;
    renda: string;
    investimento: string;
}

export interface CotacaoPapel {
    cotacao: string;
    dia: string;
    papel: string;
}
interface CotacaoPapelError {
    papel: string;
    errorMessage: string;
}

export default function VisaoGeral() {
    const toast = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [tiposDeRenda, setTiposDeRenda] = useState<string[]>([])
    const [tiposDeInvestimento, setTiposDeInvestimento] = useState<string[]>([])
    const [investimentosData, setInvestimentosData] = useState<any>({})
    const [cotacoesPapeis, setCotacoesPapeis] = useState<CotacaoPapel[]>([])
    const [cotacoesPapeisError, setCotacoesPapeisError] = useState<boolean>(false)
    const [papeisInfos, setPapeisInfos] = useState<Record<string, PapeisInfos[]>>({})
    const [filtroGrafico, setFiltroGrafico] = useState<string>('geral')

    const [chartData, setChartData] = useState({
        labels: ['A', 'B'],
        datasets: [
            {
                label: 'R$',
                data: [300, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    '#ffff80',
                    '#fdeb61',
                    '#fcd742',
                    '#fac223',
                    '#f8ae04',
                    '#9c8200'
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D",
                    '#fcfc8f',
                    '#faea6f',
                    '#fad954',
                    '#f9c432',
                    '#fdb611',
                    '#9c830a'
                ]
            }
        ]
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

    const { states } = useContext(globalContext)
    const { temaEstaEscuro } = states as GlobalStatesType

    useEffect(() => {
        const cor = temaEstaEscuro ? colors.white : colors.lightBlue

        setLightOptions(prev => {
            const newState = { ...prev }
            newState.plugins.legend.labels.color = cor

            return newState
        })
    }, [temaEstaEscuro])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)

                const id = await getUserId()

                const res = await UsuariosService.pegarInformacoesDeInvestimentosDoUsuario(id)

                const movimentacoesPapeis = res.data.movimentacoesPapeis

                const rendas = Object.keys(movimentacoesPapeis)
                let tiposDeInvestimentos: string[] = []
                let papeis: string[] = []
                let papeisInfosAux: Record<string, PapeisInfos[]> = {}

                const informacoes: any = {}

                const labels: string[] = []
                const data: number[] = []

                rendas.map(renda => {
                    if (!informacoes[renda]) {
                        informacoes[renda] = {
                            totalInvestido: 0,
                            investimentos: {}
                        }
                    }

                    const tiposDeInvestimentosDaRenda = Object.keys(movimentacoesPapeis[renda])

                    tiposDeInvestimentos.push(...tiposDeInvestimentosDaRenda)

                    tiposDeInvestimentosDaRenda.map(investimento => {

                        if (!informacoes[renda].investimentos[investimento]) {
                            informacoes[renda].investimentos[investimento] = {
                                totalInvestido: 0,
                                papeis: {}
                            }
                        }

                        const papeisDoInvestimento = Object.keys(movimentacoesPapeis[renda][investimento])

                        papeis.push(...papeisDoInvestimento)

                        papeisDoInvestimento.map(papel => {

                            let totalInvestido = 0
                            let totalVendido = 0
                            let qtdAtual = 0
                            let qtdTotal = 0

                            movimentacoesPapeis[renda][investimento][papel].map((mov: any) => {
                                const movimentacaoDeVenda = mov.tipoMovimentacao.toLowerCase() === 'venda'

                                totalInvestido += movimentacaoDeVenda ? 0 : mov.preco * mov.qtd
                                totalVendido += movimentacaoDeVenda ? mov.preco * mov.qtd : 0
                                qtdAtual += movimentacaoDeVenda ? mov.qtd * - 1 : mov.qtd
                                qtdTotal += movimentacaoDeVenda ? 0 : mov.qtd
                            })

                            const precoMedio = totalInvestido / qtdAtual

                            informacoes[renda].investimentos[investimento].papeis[papel] = { precoMedio, totalInvestido, totalVendido, qtdAtual, qtdTotal }
                            informacoes[renda].investimentos[investimento].totalInvestido += totalInvestido

                            if (!investimento || investimento === "null" && !papeisInfosAux[renda]) {
                                papeisInfosAux[renda] = []
                            }

                            if (!investimento || investimento === "null") {
                                papeisInfosAux[renda].push({ ...informacoes[renda].investimentos[investimento].papeis[papel], papel, renda, investimento })
                                return
                            }

                            if (!papeisInfosAux[investimento]) {
                                papeisInfosAux[investimento] = []
                            }

                            papeisInfosAux[investimento].push({ ...informacoes[renda].investimentos[investimento].papeis[papel], papel, renda, investimento })

                        })

                        informacoes[renda].totalInvestido += informacoes[renda].investimentos[investimento].totalInvestido
                    })

                    data.push(informacoes[renda].totalInvestido)
                    labels.push(renda)
                })


                Array.isArray(rendas) && setChartData(prev => {

                    const datasets = [...prev.datasets]

                    datasets[0].data = data

                    return { ...prev, labels, datasets }
                })

                const investimentosParapegaCotacao: string[] = Object.keys(papeisInfosAux).filter(investimento => investimento === "fundo imobiliario" || investimento === "acao")
                const papeisParaPegarCotacao: string[] = investimentosParapegaCotacao.map(investimento => {
                    return papeisInfosAux[investimento]
                }).flat(1).map(papel => papel.papel)

                // PapelService.getCotacaoVarios(papeisParaPegarCotacao).then((res: any) => {
                //     if (res.message) {
                //         return setCotacoesPapeisError(true)
                //     }

                //     if (!Array.isArray(res.data)) {
                //         return setCotacoesPapeisError(true)
                //     }

                //     // const cotacoesSemErro: CotacaoPapel[] = res.data.filter((cotacao: CotacaoPapelError) => !cotacao.errorMessage)
                //     const cotacoesSemErro: CotacaoPapel[] = [
                //         {
                //             cotacao: "14.9000",
                //             dia: "2023-09-04",
                //             papel: "BBDC4"
                //         },
                //         {
                //             cotacao: "196.5000",
                //             dia: "2023-09-04",
                //             papel: "NSLU11"
                //         },
                //         {
                //             cotacao: "10.97000",
                //             dia: "2023-09-04",
                //             papel: "MXRF11"
                //         }
                //     ]

                //     setCotacoesPapeis(cotacoesSemErro)
                // })

                informacoes && setInvestimentosData(informacoes)
                Array.isArray(tiposDeInvestimentos) && setTiposDeInvestimento(tiposDeInvestimentos.filter(inv => inv !== `null`))
                Array.isArray(rendas) && setTiposDeRenda(rendas)
                papeisInfosAux && setPapeisInfos(papeisInfosAux)
            } catch (error: any) {
                mensagemDeErro(toast, 'Algo deu errado :(', 'tente novamente mais tarde!')
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        onChangeGraficoData()
    }, [filtroGrafico])

    function onChangeGraficoData() {
        const labels: string[] = []
        const data: number[] = []

        if (filtroGrafico === 'geral') {
            Object.keys(investimentosData).map(renda => {
                labels.push(renda)
                data.push(investimentosData[renda].totalInvestido)
            })
        }

        else if (tiposDeRenda.includes(filtroGrafico) && filtroGrafico !== 'tesouro') {
            Object.keys(investimentosData).map(renda => {
                if (renda !== filtroGrafico) {
                    return
                }

                Object.keys(investimentosData[renda].investimentos).map(investimento => {
                    labels.push(investimento)
                    data.push(investimentosData[renda].investimentos[investimento].totalInvestido)
                })
            })

            return setChartData(prev => {

                const datasets = [...prev.datasets]

                datasets[0].data = data

                return { ...prev, labels, datasets }
            })
        }

        else if (tiposDeInvestimento.includes(filtroGrafico) || filtroGrafico === 'tesouro') {
            Object.keys(investimentosData).map(renda => {
                if (filtroGrafico === 'tesouro' && filtroGrafico !== renda) {
                    return
                }
                Object.keys(investimentosData[renda].investimentos).map(investimento => {
                    if (filtroGrafico !== 'tesouro' && investimento !== filtroGrafico) {
                        return
                    }
                    Object.keys(investimentosData[renda].investimentos[investimento].papeis).map(papel => {
                        labels.push(papel)
                        data.push(investimentosData[renda].investimentos[investimento].papeis[papel].totalInvestido)
                    })
                })
            })
        }

        return setChartData(prev => {
            const datasets = [...prev.datasets]

            datasets[0].data = data

            return { ...prev, labels, datasets }
        })

    }

    return (
        <PageWrapler>
            <Toast reference={toast} />

            {loading && <h1>Buscando Informações...</h1>}

            {!loading && !tiposDeRenda.length &&
                <SemMovimentacoes />
            }

            {!loading && !!tiposDeRenda.length &&
                <FiltrosGrafico
                    filtroGrafico={filtroGrafico}
                    setFiltroGrafico={setFiltroGrafico}
                    tiposDeInvestimento={tiposDeInvestimento}
                    tiposDeRenda={tiposDeRenda}
                />
            }

            {!loading && !!tiposDeRenda.length &&
                <SubSection>
                    <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40vw', minWidth: '300px' }} />
                </SubSection>
            }

            {!loading && !!tiposDeRenda.length &&
                <InfosPapelPainel
                    papeisInfos={papeisInfos}
                    cotacoesPapeis={cotacoesPapeis}
                />
            }

        </PageWrapler >
    )
}
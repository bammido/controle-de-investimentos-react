import { useEffect, useRef, useState, useContext } from 'react';
import { Chart } from 'primereact/chart';
import { mensagemDeErro } from '../../helpers/functions/Toast';
import { Toast } from '../../Components/Toast/Toast';
import UsuariosService from '../../services/UsuariosService/UsuariosService';
import getUserId from '../../helpers/functions/getUserId';
import { RadioButton } from 'primereact/radiobutton';
import { GlobalStatesType, globalContext } from '../../Contexts/GlobalContext';
import { colors } from '../../theme/Theme';
import { FiltrosGraficoDiv, FiltrosGraficoOption, FiltrosGraficoRadioOptions, InfosPapel, PageWrapler, SubSection } from '../../styles/PainelDeAnalise';
import { formatToBRL } from '../../helpers/functions/formatCurrency';

interface PapeisInfos {
    precoMedio: number;
    totalInvestido: number;
    totalVendido: number;
    qtdAtual: number;
    qtdTotal: number;
    papel: string;
    renda: string;
    investimento: string;
}

export default function PainelDeAnalise() {
    const toast = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [tiposDeRenda, setTiposDeRenda] = useState<string[]>([])
    const [tiposDeInvestimento, setTiposDeInvestimento] = useState<string[]>([])
    const [investimentosData, setInvestimentosData] = useState<any>({})
    const [papeisInfos, setPapeisInfos] = useState<PapeisInfos[]>([])
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
                let papeisInfosAux: PapeisInfos[] = []

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

                            papeisInfosAux.push({ ...informacoes[renda].investimentos[investimento].papeis[papel], papel, renda, investimento })
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

                setInvestimentosData(informacoes)
                Array.isArray(rendas) && setTiposDeInvestimento(tiposDeInvestimentos)
                Array.isArray(tiposDeInvestimentos) && setTiposDeRenda(rendas)
                Array.isArray(papeisInfosAux) && setPapeisInfos(papeisInfosAux)
            } catch (error: any) {
                console.log(error)
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

        else if (tiposDeRenda.includes(filtroGrafico)) {
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

        else if (tiposDeInvestimento.includes(filtroGrafico)) {
            Object.keys(investimentosData).map(renda => {
                Object.keys(investimentosData[renda].investimentos).map(investimento => {
                    if (investimento !== filtroGrafico) {
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
            <SubSection>
                <h2>Qual gráfico gostaria de ver?</h2>
                <FiltrosGraficoDiv>
                    <FiltrosGraficoOption>
                        <span>Geral</span>
                        <FiltrosGraficoRadioOptions>
                            <div>
                                <RadioButton
                                    value="geral"
                                    name="filtro-grafico"
                                    onChange={(e) => setFiltroGrafico(e.value)}
                                    checked={filtroGrafico === "geral"}
                                    inputId="geral"
                                />
                                <label htmlFor="geral">visão geral da carteira</label>
                            </div>
                        </FiltrosGraficoRadioOptions>
                    </FiltrosGraficoOption>
                    <FiltrosGraficoOption>
                        <span>Renda</span>
                        <FiltrosGraficoRadioOptions>
                            {tiposDeRenda.map(renda => <div key={renda}>
                                <RadioButton
                                    value={renda}
                                    name="filtro-grafico"
                                    onChange={(e) => setFiltroGrafico(e.value)}
                                    checked={filtroGrafico === renda}
                                    inputId={renda}

                                />
                                <label htmlFor={renda}>{renda}</label>
                            </div>)}
                        </FiltrosGraficoRadioOptions>
                    </FiltrosGraficoOption>
                    <FiltrosGraficoOption>
                        <span>Investimento</span>
                        <FiltrosGraficoRadioOptions>
                            {tiposDeInvestimento.map(investimento => <div key={investimento}>
                                <RadioButton
                                    value={investimento}
                                    name="filtro-grafico"
                                    onChange={(e) => setFiltroGrafico(e.value)}
                                    checked={filtroGrafico === investimento}
                                    inputId={investimento}
                                />
                                <label htmlFor={investimento}>{investimento}</label>
                            </div>)}
                        </FiltrosGraficoRadioOptions>
                    </FiltrosGraficoOption>
                </FiltrosGraficoDiv>
            </SubSection>

            <SubSection>
                <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40vw', minWidth: '300px' }} />
            </SubSection>

            <SubSection>
                <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {papeisInfos.map(info => <InfosPapel key={info.papel}>
                        <h3>{info.papel}</h3>
                        <div>
                            <div>
                                <span>Preço Médio</span>
                                <span>{formatToBRL(info.precoMedio)}</span>
                            </div>
                            <div>
                                <span>QTD Atual</span>
                                <span>{info.qtdAtual}</span>
                            </div>
                            <div>
                                <span>Total Investido</span>
                                <span>{formatToBRL(info.totalInvestido)}</span>
                            </div>
                            <div>
                                <span>Tipo</span>
                                <span>{info.renda} {(info?.investimento && info.investimento !== 'null') ? `> ${info.investimento}` : ''}</span>
                            </div>
                        </div>
                    </InfosPapel>)}
                </div>
            </SubSection>

        </PageWrapler >
    )
}
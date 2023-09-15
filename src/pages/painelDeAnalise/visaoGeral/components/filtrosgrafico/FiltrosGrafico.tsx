import { FiltrosGraficoDiv, FiltrosGraficoOption, FiltrosGraficoRadioOptions, SubSection } from '../../style';
import { RadioButton } from 'primereact/radiobutton';

interface Props {
    filtroGrafico: string;
    tiposDeRenda: string[];
    tiposDeInvestimento: string[];
    setFiltroGrafico: React.Dispatch<React.SetStateAction<string>>;
}

export default function FiltrosGrafico({
    filtroGrafico,
    tiposDeRenda,
    tiposDeInvestimento,
    setFiltroGrafico
}: Props) {
    return <SubSection>
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
}
import { SubSection } from '../../style';
import { Accordion, AccordionTab } from 'primereact/accordion';
import InfosPapelCard from './InfosPapelCard';
import { CotacaoPapel, PapeisInfos } from '../../VisaoGeral';
import { colors } from '../../../../../theme/Theme';

interface Props {
    cotacoesPapeis: CotacaoPapel[];
    papeisInfos: Record<string, PapeisInfos[]>;
}

export default function InfosPapelPainel({
    cotacoesPapeis,
    papeisInfos,
}: Props) {
    return <SubSection>
        <Accordion multiple activeIndex={[0]} style={{ width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: "column", border: `4px solid ${colors.blue}`, padding: "1rem 2rem" }}>
            {Object.keys(papeisInfos).length && Object.keys(papeisInfos).map(investimento => {
                return <AccordionTab header={investimento} style={{ margin: "1vh 0" }} >
                    <div style={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                        {papeisInfos[investimento].map(info => {
                            const cotacaoPapel = cotacoesPapeis.find(cotacao => cotacao.papel === info.papel)

                            return <InfosPapelCard
                                info={info}
                                cotacaoPapel={cotacaoPapel}
                            />
                        })}
                    </div>
                </AccordionTab>
            })}
        </Accordion>
    </SubSection>
}
import formatDate from '../../../../../helpers/functions/formatDate';
import { formatToBRL } from '../../../../../helpers/functions/formatCurrency';
import { GainLosssField, InfosPapel } from '../../style';
import { CotacaoPapel, PapeisInfos } from '../../VisaoGeral';

interface Props {
    info: PapeisInfos;
    cotacaoPapel?: CotacaoPapel;
}

export default function InfosPapelCard({
    info,
    cotacaoPapel
}: Props) {

    const cotacaoNumber = cotacaoPapel?.cotacao && Number(cotacaoPapel?.cotacao)
    const gainLoss = cotacaoNumber && ((cotacaoNumber * 100) / info.precoMedio) - 100

    return <InfosPapel key={info.papel}>
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
            {cotacaoPapel && <>
                <div>
                    <span>Cotação {`(${formatDate((cotacaoPapel).dia)})`}</span>
                    <span>{formatToBRL(Number(cotacaoPapel.cotacao))}</span>
                </div>
                <GainLosssField gain={!!gainLoss && gainLoss >= 0} title="porcetagem de ganho ou perda em relação ao preço médio" >
                    <span>{gainLoss && gainLoss >= 0 ? "Gain" : "Loss"}</span>
                    <span>{(gainLoss as number).toFixed(2)} %</span>
                </GainLosssField>
            </>}
            <div>
                <span>Tipo</span>
                <span>{info.renda} {(info?.investimento && info.investimento !== 'null') ? `> ${info.investimento}` : ''}</span>
            </div>
        </div>
    </InfosPapel>
}
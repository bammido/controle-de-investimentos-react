import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';
import { useState } from 'react';
import Navigation from '../../Navigation';
import { BarraDeNavegacaoWrapper } from '../../styles/BarraDeNavegacao';

type Event = TabMenuTabChangeParams & { index: number, value: { label: string, action: () => {} } }

export default function BarraDeNavegacao() {
    const [telaAtual, setTelaAtual] = useState(0)

    const { goToCadastrarMovimentacoes, goToCadastrarInvestimentos, goToVerInvestimentos, goToVerMovimentacoes } = Navigation()

    function onChange(e: Event) {
        setTelaAtual(e.index)
        e.value.action()
    }

    const telas = [
        { label: 'Cadastrar Investimento', icon: 'pi pi-plus', action: goToCadastrarInvestimentos },
        { label: 'Ver investimentos', icon: 'pi pi-chart-line', action: goToVerInvestimentos },
        { label: 'Cadastrar Movimentação', icon: 'pi pi-cart-plus', action: goToCadastrarMovimentacoes },
        { label: 'Ver Movimentações', icon: 'pi pi-shopping-cart', action: goToVerMovimentacoes },

    ];

    return <BarraDeNavegacaoWrapper>
        <TabMenu model={telas} activeIndex={telaAtual} onTabChange={(e: Event) => onChange(e)} />
    </BarraDeNavegacaoWrapper>
}
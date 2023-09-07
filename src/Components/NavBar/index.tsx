import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';
import { useState } from 'react';
import Navigation from '../../Navigation';
import { BarraDeNavegacaoWrapper } from './style';

type Event = TabMenuTabChangeParams & { index: number, value: { label: string, action: () => {} } }

export default function BarraDeNavegacao() {
    const [telaAtual, setTelaAtual] = useState(0)

    const { goToCadastrarMovimentacoes, goToVerPapeis, goToCadastrarPapel, goToVerMovimentacoes } = Navigation()

    function onChange(e: Event) {
        setTelaAtual(e.index)
        e.value.action()
    }

    const telas = [
        { label: 'Cadastrar Papel', icon: 'pi pi-plus', action: goToCadastrarPapel },
        { label: 'Ver papeis', icon: 'pi pi-chart-line', action: goToVerPapeis },
        { label: 'Cadastrar Movimentação', icon: 'pi pi-cart-plus', action: goToCadastrarMovimentacoes },
        { label: 'Ver Movimentações', icon: 'pi pi-shopping-cart', action: goToVerMovimentacoes },

    ];

    return <BarraDeNavegacaoWrapper>
        <TabMenu model={telas} activeIndex={telaAtual} onTabChange={(e: Event) => onChange(e)} />
    </BarraDeNavegacaoWrapper>
}
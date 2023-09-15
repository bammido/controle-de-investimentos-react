import { TabMenu, TabMenuTabChangeParams } from 'primereact/tabmenu';
import { useEffect, useState } from 'react';
import { BarraDeNavegacaoWrapper } from './style';

import { MenuItem } from 'primereact/menuitem';
import { useLocation } from 'react-router-dom';

interface Props {
    telas: MenuItem[]
}

type Event = TabMenuTabChangeParams & {
    index: number,
    value: { label: string, action: () => {} }
}

export default function BarraDeNavegacao({
    telas
}: Props) {
    const location = useLocation();

    const [telaAtual, setTelaAtual] = useState(0)

    useEffect(() => {
        if (location && location.pathname) {

            const paths = location.pathname.split('/')
            const rotaATual = paths[paths.length - 1]

            telas.map((tela, index) => {
                tela.id === rotaATual && setTelaAtual(index)
            })
        }
    }, [telas])

    function onChange(e: Event) {
        setTelaAtual(e.index)
        e.value.action()
    }

    return <BarraDeNavegacaoWrapper>
        <TabMenu model={telas} activeIndex={telaAtual} onTabChange={(e: Event) => onChange(e)} />
    </BarraDeNavegacaoWrapper>
}
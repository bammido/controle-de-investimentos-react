import { TabMenu } from 'primereact/tabmenu';
import { useState } from 'react';
import Navigation from '../../Navigation';

export default function BarraDeNavegacao(){
    const [telaAtual, setTelaAtual] = useState(0)
    
    const {goToCadastrarInvestimentos, goToHome, goToVerInvestimentos} = Navigation() 

    function onChange(e){
        setTelaAtual(e.index)
        e.value.action()
    } 

    const telas = [
        {label: 'Cadastrar Investimento', icon: 'pi pi-plus', action: goToCadastrarInvestimentos},
        {label: 'Ver investimentos', icon: 'pi pi-chart-line', action: goToVerInvestimentos},
        {label: 'Cadastrar Compra', icon: 'pi pi-cart-plus', action: goToCadastrarInvestimentos},
        {label: 'Ver Compras', icon: 'pi pi-shopping-cart', action: goToVerInvestimentos},

    ];

    return <div style={{width: '100%',display: 'flex', justifyContent: 'center'}}>
        <TabMenu model={telas} activeIndex={telaAtual} onTabChange={e=>onChange(e)} />
    </div>
}
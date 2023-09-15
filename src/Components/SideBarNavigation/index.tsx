import { useState, useContext } from 'react'
import Button from '../Button';
import Sidebar from "../SideBar";
import { SideBarButtonsWrapper, SideBarNavButton, SideBarNavigationShowButton, SideBarNavigationWrapper, SideBarThemeButtom, SideBarWrapper } from './style';
import Navigation from "../../Navigation"
import { globalContext, GlobalMethodsType, GlobalStatesType } from '../../Contexts/GlobalContext';
import { colors, temaClaro, temaEscuro } from '../../theme/Theme';

export default function SideBarNavigation() {
    const [mostrar, setMostrar] = useState<boolean>(false)
    const { goToLogin, goToControle, goToHome, goToPainelDeAnalise, goToFerramentasUteis } = Navigation()

    function onHide() {
        setMostrar(false)
    }

    function logOut() {
        localStorage.clear()
        goToLogin()
    }

    const { states, methods } = useContext(globalContext)
    const { temaEstaEscuro } = states as GlobalStatesType
    const { mudaTema } = methods as GlobalMethodsType

    return <SideBarNavigationWrapper>
        <Sidebar
            showCloseIcon={false}
            style={{ backgroundColor: temaEstaEscuro ? temaEscuro.pallete.primary.main : temaClaro.pallete.primary.main }}
            visible={mostrar}
            onHide={onHide}
        >
            <SideBarWrapper>
                <div>
                    <SideBarButtonsWrapper>
                        <SideBarNavButton
                            bgcolor={colors.darkPurple}
                            onClick={goToHome}
                            label='Home'
                            aria-label='Home'
                            iconPos='right'
                            icon='pi pi-home'
                        />
                    </SideBarButtonsWrapper>
                    <SideBarButtonsWrapper>
                        <SideBarNavButton
                            bgcolor={colors.federalBlue}
                            onClick={goToControle}
                            label='controle de investimentos'
                            aria-label='controle de investimentos'
                            iconPos='right'
                            icon='pi pi-dollar'
                        />
                    </SideBarButtonsWrapper>
                    <SideBarButtonsWrapper>
                        <SideBarNavButton
                            bgcolor={colors.lightWashedOrange}
                            onClick={goToPainelDeAnalise}
                            label='Painel de Análise'
                            aria-label='Painel de Análise'
                            iconPos='right'
                            icon='pi pi-mobile'
                        />
                    </SideBarButtonsWrapper>
                    <SideBarButtonsWrapper>
                        <SideBarNavButton
                            bgcolor={colors.basil}
                            onClick={goToFerramentasUteis}
                            label='Ferramentas Úteis'
                            aria-label='Ferramentas Úteis'
                            iconPos='right'
                            icon='pi pi-wrench'
                        />
                    </SideBarButtonsWrapper>
                </div>
                <div>
                    <SideBarButtonsWrapper>
                        <SideBarThemeButtom
                            onClick={() => mudaTema(!temaEstaEscuro)}
                            label={`mudar para tema ${temaEstaEscuro ? 'claro' : 'escuro'}`}
                            aria-label='logOut'
                            iconPos='right'
                            icon={`pi ${temaEstaEscuro ? 'pi-sun' : 'pi-moon'}`}
                        />
                    </SideBarButtonsWrapper>
                    <SideBarButtonsWrapper>
                        <Button
                            onClick={logOut}
                            label='logOut'
                            aria-label='logOut'
                            iconPos='right'
                            icon='pi pi-sign-out'
                        />
                    </SideBarButtonsWrapper>
                </div>
            </SideBarWrapper>
        </Sidebar>
        <SideBarNavigationShowButton icon="pi pi-arrow-right" onClick={(e) => setMostrar(true)} />
    </SideBarNavigationWrapper>
}
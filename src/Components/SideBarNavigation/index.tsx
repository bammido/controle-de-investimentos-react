import { useState, useContext } from 'react'
import Button from '../Button';
import Sidebar from "../SideBar";
import { SideBarButtonsWrapper, SideBarNavigationShowButton, SideBarNavigationWrapper, SideBarThemeButtom, SideBarWrapper } from './style';
import Navigation from "../../Navigation"
import { globalContext, GlobalMethodsType, GlobalSettersType, GlobalStatesType } from '../../Contexts/GlobalContext';
import { temaClaro, temaEscuro } from '../../theme/Theme';

export default function SideBarNavigation() {
    const [mostrar, setMostrar] = useState<boolean>(false)
    const { goToLogin } = Navigation()

    function onHide() {
        setMostrar(false)
    }


    function logOut() {
        localStorage.clear()
        goToLogin()
    }

    const { states, setters, methods } = useContext(globalContext)
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
            </SideBarWrapper>
        </Sidebar>
        <SideBarNavigationShowButton icon="pi pi-arrow-right" onClick={(e) => setMostrar(true)} />
    </SideBarNavigationWrapper>
}
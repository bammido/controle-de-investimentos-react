import { useState, useContext } from 'react'
import Button from '../Button';
import Sidebar from "../SideBar";
import { SideBarButtonsWrapper, SideBarNavigationShowButton, SideBarNavigationWrapper, SideBarThemeButtom, SideBarWrapper } from './style';
import Navigation from "../../Navigation"
import { globalContext, SettersType } from '../../Contexts/GlobalContext';
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

    const { states, setters } = useContext(globalContext)
    const { temaEstaEscuro } = states
    const { setTemaEstaEscuro } = setters as SettersType

    return <SideBarNavigationWrapper>
        <Sidebar
            showCloseIcon={false}
            style={{ backgroundColor: temaEstaEscuro ? temaEscuro.pallete.primary.main : temaClaro.pallete.primary.main }}
            visible={mostrar}
            onHide={onHide}
        >
            <SideBarWrapper>
                <SideBarButtonsWrapper>
                <Button
                    onClick={logOut}
                    label='logOut'
                    aria-label='logOut'
                    iconPos='right'
                    icon='pi pi-sign-out'
                />
                </SideBarButtonsWrapper>
                <SideBarButtonsWrapper>
                    <SideBarThemeButtom
                        onClick={() => setTemaEstaEscuro(prev => prev ? false : true)}
                        label={`mudar para tema ${temaEstaEscuro ? 'claro' : 'escuro'}`}
                        aria-label='logOut'
                        iconPos='right'
                        icon={`pi ${temaEstaEscuro ? 'pi-sun' : 'pi-moon'}`}
                    />
                </SideBarButtonsWrapper>
            </SideBarWrapper>
        </Sidebar>
        <SideBarNavigationShowButton icon="pi pi-arrow-right" onClick={(e) => setMostrar(true)} />
    </SideBarNavigationWrapper>
}
import { useState } from 'react'
import Button from '../Button';
import Sidebar from "../SideBar";
import { SideBarNavigationShowButton, SideBarNavigationWrapper, SideBarWrapper } from './style';
import Navigation from "../../Navigation"

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

    return <SideBarNavigationWrapper>
        <Sidebar visible={mostrar} onHide={onHide} >
            <SideBarWrapper>
                <Button
                    onClick={logOut}
                    label='logOut'
                    aria-label='logOut'
                    iconPos='right'
                    icon='pi pi-sign-out'
                />
            </SideBarWrapper>
        </Sidebar>
        <SideBarNavigationShowButton icon="pi pi-arrow-right" onClick={(e) => setMostrar(true)} />
    </SideBarNavigationWrapper>
}
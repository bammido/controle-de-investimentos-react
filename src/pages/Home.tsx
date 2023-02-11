import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../Components/NavBar";
import SideBarNavigation from "../Components/SideBarNavigation";
import { globalContext } from "../Contexts/GlobalContext";
import useIsAuthenticated from "../helpers/hooks/useIsAuthenticated";
import Navigation from "../Navigation";
import { BarraDeNavegacaoDiv, HomePageWrapper, OutLetDiv } from "../styles/Home";

export default function Home() {

  useIsAuthenticated()

  const { states } = useContext(globalContext)

  const { goToCadastrarInvestimentos } = Navigation()

  useEffect(() => {
    setTimeout(() => {
      goToCadastrarInvestimentos()
    }, 2000)
  }, [])

  return <HomePageWrapper>
    <SideBarNavigation />
    <OutLetDiv>
      <Outlet />
    </OutLetDiv>
    <BarraDeNavegacaoDiv>
      <BarraDeNavegacao />
    </BarraDeNavegacaoDiv>
  </HomePageWrapper>
}
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../Components/NavBar";
import { globalContext } from "../Contexts/GlobalContext";
import useIsAuthenticated from "../helpers/hooks/useIsAuthenticated";
import { BarraDeNavegacaoDiv, HomePageWrapper, OutLetDiv } from "../styles/Home";

export default function Home() {

  useIsAuthenticated()

  const { states } = useContext(globalContext)

  return <HomePageWrapper>
    <OutLetDiv>
      <Outlet />
    </OutLetDiv>
    <BarraDeNavegacaoDiv>
      <BarraDeNavegacao />
    </BarraDeNavegacaoDiv>
  </HomePageWrapper>
}
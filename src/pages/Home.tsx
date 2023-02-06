import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../Components/NavBar";
import { globalContext } from "../Contexts/GlobalContext";
import useIsAuthenticated from "../helpers/hooks/useIsAuthenticated";

export default function Home() {

  useIsAuthenticated()

  const { states } = useContext(globalContext)

  return <div>
    <BarraDeNavegacao />
    <Outlet />
  </div>
}
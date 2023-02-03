import React from "react";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../Components/NavBar";
import useIsAuthenticated from "../helpers/hooks/useIsAuthenticated";

export default function Home() {

  useIsAuthenticated()

  return <div>
    <BarraDeNavegacao />
    <Outlet />
  </div>
}
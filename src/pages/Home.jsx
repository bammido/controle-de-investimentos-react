import React from "react";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";
import BarraDeNavegacao from "../Components/NavBar";

export default function Home(){
    return  <div>
    <BarraDeNavegacao/>
    <Outlet/>
  </div>
}
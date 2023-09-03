import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "./pages/404";
import CadastrarMovimentacoes from "./pages/controle/cadastrarMovimentacoes/CadastrarMovimentacoes";
import CadastrarInvestimentos from "./pages/controle/CadastrarPapel/CadastrarPapel";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerInvestimentos from "./pages/controle/VerPapeis/VerInvestimentos";
import VerMovimentacoes from "./pages/controle/verMovimentacoes/VerMovimentacoes";
import ControlePapeis from "./pages/controle/ControlePapeis";
import PainelDeAnalise from "./pages/painelDeAnalise/PainelDeAnalise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <PainelDeAnalise />
      },
      {
        path: 'controle',
        element: <ControlePapeis />,
        children: [
          {
            path: "cadastrar-movimentacoes",
            element: <CadastrarMovimentacoes />
          },
          {
            path: "cadastrar-papel",
            element: <CadastrarInvestimentos />
          },
          {
            path: "ver-papeis",
            element: <VerInvestimentos />
          },
          {
            path: "ver-movimentacoes",
            element: <VerMovimentacoes />
          },
        ]
      }
    ]
  }, {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  }, {
    path: "/cadastrar-usuario",
    element: <Cadastro />,
    errorElement: <NotFound />,
  },

])

export default router
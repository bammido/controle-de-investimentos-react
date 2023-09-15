import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/404";
import CadastrarMovimentacoes from "./pages/controle/cadastrarMovimentacoes/CadastrarMovimentacoes";
import CadastrarInvestimentos from "./pages/controle/CadastrarPapel/CadastrarPapel";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import VerInvestimentos from "./pages/controle/VerPapeis/VerInvestimentos";
import VerMovimentacoes from "./pages/controle/verMovimentacoes/VerMovimentacoes";
import ControlePapeis from "./pages/controle/ControlePapeis";
import VisaoGeral from "./pages/painelDeAnalise/visaoGeral/VisaoGeral";
import PainelDeAnalise from "./pages/painelDeAnalise/PainelDeAnalise";
import { controle, ferramentasUteis } from "./constants/rotas";
import InfosControle from "./pages/controle/infos/Infos";
import InfosPainedDeAnalise from "./pages/painelDeAnalise/infos/Infos";
import InfosHome from "./pages/Infos";
import FerramentasUteis from "./pages/ferramnetasUteis/FerramentasUteis";
import CalcuLadoraDeJurosCompostos from "./pages/ferramnetasUteis/calculadoraDeJurosCompostos/CalculadoraDeJurosCompostos";
import InfosFerramentasUteis from "./pages/ferramnetasUteis/infos/Infos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'painel-de-analise',
        element: <PainelDeAnalise />,
        children: [
          {
            path: 'visao-geral',
            element: <VisaoGeral />
          },
          {
            path: '',
            element: <InfosPainedDeAnalise />
          }
        ]
      },
      {
        path: 'controle',
        element: <ControlePapeis />,
        children: [
          {
            path: controle.cadastrarMovimentacao,
            element: <CadastrarMovimentacoes />
          },
          {
            path: controle.cadastrarPapel,
            element: <CadastrarInvestimentos />
          },
          {
            path: controle.verPapeis,
            element: <VerInvestimentos />
          },
          {
            path: controle.verMovimentacoes,
            element: <VerMovimentacoes />
          },
          {
            path: '',
            element: <InfosControle />
          },
        ]
      },
      {
        path: '',
        element: <InfosHome />,
      },
      {
        path: 'ferramentas-uteis',
        element: <FerramentasUteis />,
        children: [
          {
            path: ferramentasUteis.caculadoraDeJurosCompostos,
            element: <CalcuLadoraDeJurosCompostos />
          },

          {
            path: "",
            element: <InfosFerramentasUteis />
          }
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
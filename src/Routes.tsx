import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "./pages/404";
import CadastrarCompras from "./pages/CadastrarCompras";
import CadastrarInvestimentos from "./pages/CadastrarInvestimentos";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerInvestimentos from "./pages/VerInvestimentos";
import VerMovimentacoes from "./pages/VerMovimentacoes";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" errorElement={<NotFound />} element={<Home />}>
//       <Route path="cadastrar-investimentos" element={<CadastrarInvestimentos />} />
//       <Route path="ver-investimentos" element={<VerInvestimentos />} />
//       {/* <Route errorElement element={<NotFound />} /> */}
//       <Route path="login" element={<Login />} />
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: "cadastrar-movimentacoes",
        element: <CadastrarCompras />
      },
      {
        path: "cadastrar-investimentos",
        element: <CadastrarInvestimentos />
      },
      {
        path: "ver-investimentos",
        element: <VerInvestimentos />
      },
      {
        path: "ver-movimentacoes",
        element: <VerMovimentacoes />
      },
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
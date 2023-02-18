import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import NotFound from "./pages/404";
import CadastrarInvestimentos from "./pages/CadastrarInvestimentos";
import Home from "./pages/Home";
import VerInvestimentos from "./pages/VerInvestimentos";
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />} element={<Home />}>
        <Route path="cadastrar-investimentos" element={<CadastrarInvestimentos />} />
        <Route path="ver-investimentos" element={<VerInvestimentos />} />
        <Route errorElement element={<NotFound />} />
    </Route>
    )
  );

// const router = createBrowserRouter([{
//     path: "/",
//     element: <Home/>,
//     errorElement: <NotFound/>,
//     children: [
//         {
//             path: "cadastrar-investimentos",
//             element: <CadastrarInvestimentos/>
//         }
//     ]
// }])

  export default router
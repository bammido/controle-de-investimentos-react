import { Outlet } from "react-router-dom";
import SideBarNavigation from "../Components/SideBarNavigation";
import useIsAuthenticated from "../helpers/hooks/useIsAuthenticated";
import { HomePageWrapper, OutLetDiv } from "../styles/Home";

export default function Home() {

  useIsAuthenticated()

  return <HomePageWrapper>
    <SideBarNavigation />
    <OutLetDiv>
      <Outlet />
    </OutLetDiv>
  </HomePageWrapper>
}
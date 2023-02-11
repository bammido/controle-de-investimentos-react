import styled from "styled-components";
import Button from "../Button";

export const SideBarNavigationWrapper = styled.div`
    width: 100%;
    position: absolute;
`

export const SideBarNavigationShowButton = styled(Button)`
    width: 1rem;
    height: 2rem;
    margin-left: 1rem;
    margin-top: 1rem;
`

export const SideBarWrapper = styled.div`
    width: 100%;
    background-color: #6366F1;

    & button{
        width: 100%;
    }
`
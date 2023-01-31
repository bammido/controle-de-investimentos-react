import { createGlobalStyle } from "styled-components";
import { fonts } from "./Theme";


export const GlobalStyle = createGlobalStyle`
* {
    font-family: ${fonts.primary};
    margin: 0;
    padding: 0;
    transition: 300ms;
}
`
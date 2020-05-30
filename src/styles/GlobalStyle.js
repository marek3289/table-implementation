import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    ul {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    *:focus {
        outline: 3px auto ${({ theme }) => theme.blue};
    }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: 100%;
    color: ${({ theme }) => theme.palette.contrastText};
    background: ${({ theme }) => theme.palette.main};
    font-family: 'Noto Sans KR', sans-serif;
  }
  #root {
    height: 100%;
  }
  html {
    height: 100%;
  }
  a {
    color: ${({ theme }) => theme.palette.contrastText};
    text-decoration: none;
  }
  img {
    display: block;
  }
`;

export default GlobalStyle;

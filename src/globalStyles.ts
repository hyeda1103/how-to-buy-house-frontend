import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
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
    color: ${({ theme }) => theme.palette.common.contrastText};
    background: ${({ theme }) => theme.palette.common.main};
    font-family: 'Noto Sans KR', sans-serif;
  }
  #root {
    height: 100%;
  }
  html {
    height: 100%;
  }
  a {
    color: ${({ theme }) => theme.palette.common.contrastText};
    text-decoration: none;
  }
  img {
    display: block;
  }
`;

export default GlobalStyle;

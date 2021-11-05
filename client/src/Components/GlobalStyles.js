import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  /* a {
    text-decoration:none;
    color:inherit;
  } */

  * {
    box-sizing:border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    padding: 0 30px;
  }

`;

export default GlobalStyles;

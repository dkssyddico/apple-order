import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  a {
    text-decoration:none;
    color:inherit;
  }

  button {
    all:unset;
    cursor: pointer;
  }

  * {
    box-sizing:border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    padding: 0 30px;
    font-family: 'Montserrat', sans-serif;
  }

  .container {
    margin-top:15vh;
  }

`;

export default GlobalStyles;

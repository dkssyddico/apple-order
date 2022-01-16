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
    font-family: 'Montserrat', sans-serif;
  }

  .container {
    margin-top:15vh;
    padding: 0 10vw;
  }

  input,
  input::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
  }

  input[type="number" i] {
    padding: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }


`;

export default GlobalStyles;

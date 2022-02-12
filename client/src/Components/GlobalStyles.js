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
    background-color: #faf9f9;
    color: #22181c;
  }

  .container {
    margin-top:15vh;
    padding: 0 10vw;
    padding-bottom:10vh;
  }

  input,
  input::placeholder {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
  }

  input[type="number" i] {
    padding: 0;
  }

  input[type="number" i].priceInput {
    padding: 1rem;
  }


  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

  select {
  -webkit-appearance: none;  
  -moz-appearance: none;
  appearance: none;
  } 

  
  select::-ms-expand {
    display: none;
  }

`;

export default GlobalStyles;

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
    font-family: 'Work Sans', sans-serif;
    background-color: white;
    color: #22181c;
    background-color: #FFFDFA;
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
  border: 2px solid lightgray;
  } 

  
  select::-ms-expand {
    display: none;
  }
`;

export default GlobalStyles;

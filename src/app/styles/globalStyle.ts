"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/path-to-pretendard.woff2') format('woff2'),
         url('/path-to-pretendard.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
  }

  #root {
    max-width: 31rem;
    margin: 0 auto;
    background-color: white;
  }

  a {
    text-decoration: none;
    color: inherit; 
  }

  ul, ol {
    list-style: none; 
  }

  img {
    max-width: 100%; 
    height: auto;
  }

  button {
    all: unset; 
    cursor: pointer;
  }
`;

export default GlobalStyle;

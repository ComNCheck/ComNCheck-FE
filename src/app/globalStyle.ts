"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body,#root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
 #root{
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

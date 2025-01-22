"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

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
    overflow: hidden;
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

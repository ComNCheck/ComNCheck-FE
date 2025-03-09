"use client";

import styled from "styled-components";

const MobileSizeWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  gap: 5rem;
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  max-width: 31rem;
  margin: 0 auto;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); //뭔가 얘때매 선 생기는 거같음
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <MobileSizeWapper>{children}</MobileSizeWapper>;
}

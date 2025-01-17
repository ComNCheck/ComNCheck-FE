"use client";

import styled from "styled-components";

const MobileSizeWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  min-height: 100vh;
  //   background-color: #f5f5f5;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 25rem;
`;

export default function Container({ children }: { children: React.ReactNode }) {
  return <MobileSizeWapper>{children}</MobileSizeWapper>;
}

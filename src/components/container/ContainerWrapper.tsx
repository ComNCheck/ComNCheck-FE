"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0rem 0.5rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${theme.colors.background};
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
`;

export default function ContainerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}

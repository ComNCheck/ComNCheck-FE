"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 95%;
  height: 15rem;
  padding: 20px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  @media only screen and (min-width: 200px) and (max-width: 480px) {
    height: 15rem;
  }
`;

export default function ContentBoxSmall({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}

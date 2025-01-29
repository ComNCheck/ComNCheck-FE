"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  padding: 10px 16px;
  background-color: ${theme.button.submit.background};
  color: ${theme.button.submit.text};
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Wrapper>{children}</Wrapper>;
}

"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

interface SubHeaderProps {
  title: string;
  description: string | React.ReactNode;
}

export default function SubHeader({ title, description }: SubHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Header>
  );
}

const Header = styled.div`
  position: fixed;
  height: 3rem;
  top: 6.5rem;
  width: calc(100% - 4rem);
  max-width: 27rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 9;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${theme.colors.mutedText};
`;

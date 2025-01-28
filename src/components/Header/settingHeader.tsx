"use client";

import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
import { theme } from "@/app/styles/theme";

const Header = styled.div`
  top: 0;
  height: 4.75rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 0.5rem;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
export default function SettingHeader() {
  return (
    <Header>
      <IoChevronBack fontSize="2rem" />
      설정
    </Header>
  );
}

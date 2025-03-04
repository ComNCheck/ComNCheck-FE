"use client";

import { theme } from "@/app/styles/theme";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const NavbarContainer = styled.div`
  padding: 4rem 0rem 0rem 1.5rem; //왼쪽 정렬
  width: 100%;
  max-width: 31rem;
  height: 6rem; //test
  display: flex;
  align-items: center;
  z-index: 10;
  background-color: ${theme.colors.background};
`;

const NavItem = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: ${theme.colors.text};
`;

export default function HeaderNavbar() {
  const pathname = usePathname();

  const getTitle = (path: string) => {
    if (path.startsWith("/faq")) {
      return "FAQ";
    }
    if (path.startsWith("/notice")) {
      return "공지";
    }
    if (path.startsWith("/seminarRoom")) {
      return "세미나실 예약";
    }
    if (path.startsWith("/my")) {
      return "MY";
    }
    return "";
  };

  return (
    <NavbarContainer>
      <NavItem>{getTitle(pathname)}</NavItem>
    </NavbarContainer>
  );
}

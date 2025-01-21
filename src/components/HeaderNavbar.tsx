"use client";

import { theme } from "@/app/styles/theme";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  top: 40px;
  padding: 0rem 0rem 0rem 2rem;
  width: 100%;
  max-width: 31rem;
  height: 5rem;
  display: flex;
  align-items: center;
  z-index: 10;
`;

const NavItem = styled.div`
  font-weight: 700;
  font-size: 30px;
  color: ${theme.colors.text};
`;

export default function HeaderNavbar() {
  const pathname = usePathname();

  const getTitle = (path: string) => {
    switch (path) {
      case "/faq":
        return "FAQ";
      case "/notice":
        return "공지";
      case "/seminarRoom":
        return "세미나실 예약";
      case "/my":
        return "MY";
      default:
        return "";
    }
  };

  return (
    <NavbarContainer>
      <NavItem>{getTitle(pathname)}</NavItem>
    </NavbarContainer>
  );
}

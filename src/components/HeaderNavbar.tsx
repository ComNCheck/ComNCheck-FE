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

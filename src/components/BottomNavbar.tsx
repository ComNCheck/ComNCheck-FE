"use client";

import { theme } from "@/app/theme";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 390px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  // padding: 0.8rem 2.5rem;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  font-weight: 700;
  font-size: 0.75rem;
  color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.mutedText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.mutedText};
`;

const getIcon = (path: string, isActive: boolean) => {
  switch (path) {
    case "/faq":
      return isActive ? (
        <img src="/icons/comment-quote-full.svg" alt="faq icon" />
      ) : (
        <img src="/icons/comment-quote-outline.svg" alt="faq icon" />
      );
    case "/notice":
      return isActive ? (
        <img src="icons/announce-full.svg" alt="notice icon" />
      ) : (
        <img src="icons/announce-outline.svg" alt="notice icon" />
      );
    case "/seminarRoom":
      return isActive ? (
        <img src="icons/seminar-full.svg" alt="seminar icon" />
      ) : (
        <img src="icons/seminar-outline.svg" alt="seminar icon" />
      );
    case "/my":
      return isActive ? (
        <img src="icons/account-circle-full.svg" alt="my icon" />
      ) : (
        <img src="icons/account-circle-outline.svg" alt="my icon" />
      );
    default:
      return null;
  }
};
export default function BottomNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <NavbarContainer>
      <NavItem
        isActive={pathname === "/faq"}
        onClick={() => handleClick("/faq")}
      >
        <IconWrapper isActive={pathname === "/faq"}>
          {getIcon("/faq", pathname === "/faq")}
        </IconWrapper>
        FAQ
      </NavItem>
      <NavItem
        isActive={pathname === "/notice"}
        onClick={() => handleClick("/notice")}
      >
        <IconWrapper isActive={pathname === "/notice"}>
          {getIcon("/notice", pathname === "/notice")}
        </IconWrapper>
        공지
      </NavItem>
      <NavItem
        isActive={pathname === "/seminarRoom"}
        onClick={() => handleClick("/seminarRoom")}
      >
        <IconWrapper isActive={pathname === "/seminarRoom"}>
          {getIcon("/seminarRoom", pathname === "/seminarRoom")}
        </IconWrapper>
        세미나실 예약
      </NavItem>
      <NavItem isActive={pathname === "/my"} onClick={() => handleClick("/my")}>
        <IconWrapper isActive={pathname === "/my"}>
          {getIcon("/my", pathname === "/my")}
        </IconWrapper>
        MY
      </NavItem>
    </NavbarContainer>
  );
}

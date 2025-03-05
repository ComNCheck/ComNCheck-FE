"use client";

import { theme } from "@/app/styles/theme";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 31rem;
  height: 5rem;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 1rem 1.2rem 1.5rem;
  z-index: 10;
`;

const NavItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  font-weight: 700;
  font-size: 0.75rem;
  color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.mutedText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.mutedText};
  img {
    width: 30px;
    height: 30px;
  }
`;

const getIcon = (path: string, isActive: boolean) => {
  if (path.startsWith("/faq")) {
    return isActive ? (
      <Image
        src="/icons/comment-quote-full.svg"
        alt="faq icon"
        width={30}
        height={30}
      />
    ) : (
      <Image
        src="/icons/comment-quote-outline.svg"
        alt="faq icon"
        width={30}
        height={30}
      />
    );
  }
  if (path.startsWith("/notice")) {
    return isActive ? (
      <Image
        src="/icons/announce-full.svg"
        alt="notice icon"
        width={30}
        height={30}
      />
    ) : (
      <Image
        src="/icons/announce-outline.svg"
        alt="notice icon"
        width={30}
        height={30}
      />
    );
  }
  if (path.startsWith("/seminarRoom")) {
    return isActive ? (
      <Image
        src="/icons/seminar-full.svg"
        alt="seminar icon"
        width={30}
        height={30}
      />
    ) : (
      <Image
        src="/icons/seminar-outline.svg"
        alt="seminar icon"
        width={30}
        height={30}
      />
    );
  }
  if (path.startsWith("/my")) {
    return isActive ? (
      <Image
        src="/icons/account-circle-full.svg"
        alt="my icon"
        width={30}
        height={30}
      />
    ) : (
      <Image
        src="/icons/account-circle-outline.svg"
        alt="my icon"
        width={30}
        height={30}
      />
    );
  }
  return "";
};

export default function BottomNavbar() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // 클라이언트가 완전히 로드되기 전까지 렌더링하지 않음

  return (
    <NavbarContainer>
      <NavItem
        isActive={pathname.startsWith("/faq")}
        onClick={() => handleClick("/faq")}
      >
        <IconWrapper isActive={pathname.startsWith("/faq")}>
          {getIcon("/faq", pathname.startsWith("/faq"))}
        </IconWrapper>
        FAQ
      </NavItem>
      <NavItem
        isActive={pathname.startsWith("/notice")}
        onClick={() => handleClick("/notice")}
      >
        <IconWrapper isActive={pathname.startsWith("/notice")}>
          {getIcon("/notice", pathname.startsWith("/notice"))}
        </IconWrapper>
        공지
      </NavItem>
      <NavItem
        isActive={pathname.startsWith("/seminarRoom")}
        onClick={() => handleClick("/seminarRoom")}
      >
        <IconWrapper isActive={pathname.startsWith("/seminarRoom")}>
          {getIcon("/seminarRoom", pathname.startsWith("/seminarRoom"))}
        </IconWrapper>
        세미나실 예약
      </NavItem>
      <NavItem
        isActive={pathname.startsWith("/my")}
        onClick={() => handleClick("/my")}
      >
        <IconWrapper isActive={pathname.startsWith("/my")}>
          {getIcon("/my", pathname.startsWith("/my"))}
        </IconWrapper>
        MY
      </NavItem>
    </NavbarContainer>
  );
}

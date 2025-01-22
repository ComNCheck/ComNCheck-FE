"use client";

import { theme } from "@/app/styles/theme";
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
  padding: 0.8rem 1rem 0.8rem 1.5rem;
  z-index: 10;
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
  img {
    width: 30px;
    height: 30px;
  }
`;

const navItems = [
  {
    path: "/faq",
    label: "FAQ",
    icons: {
      active: "/icons/comment-quote-full.svg",
      inactive: "/icons/comment-quote-outline.svg",
      alt: "faq icon",
    },
  },
  {
    path: "/notice",
    label: "공지",
    icons: {
      active: "/icons/announce-full.svg",
      inactive: "/icons/announce-outline.svg",
      alt: "notice icon",
    },
  },
  {
    path: "/seminarRoom",
    label: "세미나실 예약",
    icons: {
      active: "/icons/seminar-full.svg",
      inactive: "/icons/seminar-outline.svg",
      alt: "seminar icon",
    },
  },
  {
    path: "/my",
    label: "MY",
    icons: {
      active: "/icons/account-circle-full.svg",
      inactive: "/icons/account-circle-outline.svg",
      alt: "my icon",
    },
  },
];

const BottomNavbar = () => {
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
      {navItems.map(({ path, label, icons }) => {
        const isActive = pathname.startsWith(path);
        return (
          <NavItem
            key={path}
            isActive={isActive}
            onClick={() => handleClick(path)}
          >
            <IconWrapper isActive={isActive}>
              <img
                src={isActive ? icons.active : icons.inactive}
                alt={icons.alt}
              />
            </IconWrapper>
            {label}
          </NavItem>
        );
      })}
    </NavbarContainer>
  );
};

export default BottomNavbar;

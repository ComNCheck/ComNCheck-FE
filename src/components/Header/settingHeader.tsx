"use client";

import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
import { theme } from "@/app/styles/theme";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const clickBackButton = () => {
    const pathname = window.location.pathname;

    if (pathname.includes("/setting/curriculum")) {
      router.push("/setting");
    } else if (pathname === "/setting") {
      router.push("/my");
    } else {
      router.back();
    }
  };
  return (
    <Header>
      <IoChevronBack fontSize="2rem" onClick={clickBackButton} />
      설정
    </Header>
  );
}

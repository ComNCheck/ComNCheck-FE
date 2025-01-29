"use client";
import StyledComponentsRegistry from "../lib/registry";
import Container from "../components/Container";
import MobileWapper from "../components/MobileWapper";
import ThemeProviderWrapper from "./styles/ThemeProviderWrapper";
import BottomNavbar from "../components/BottomNavbar";
import GlobalStyle from "./styles/globalStyle";
import HeaderNavbar from "@/components/Header/HeaderNavbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const hidePaths = ["/login", "/signup", "/setting"]; // 네비바 숨길 경로 배열
  const shouldHide = hidePaths.some((path) => pathname.startsWith(path));
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            {/* {loading ? (
              <Loading />
            ) : ( */}
            <Container>
              {!shouldHide && <HeaderNavbar />}
              <MobileWapper>{children}</MobileWapper>
              {!shouldHide && <BottomNavbar />}
            </Container>
            {/* )} */}
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

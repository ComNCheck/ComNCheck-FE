"use client";
import StyledComponentsRegistry from "../lib/registry";
import Container from "../components/Container";
import MobileWapper from "../components/MobileWapper";
import ThemeProviderWrapper from "./styles/ThemeProviderWrapper";
import BottomNavbar from "../components/BottomNavbar";
import GlobalStyle from "./styles/globalStyle";
import HeaderNavbar from "@/components/HeaderNavbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hidePaths = ["/login", "/login/first", "/signup", "/signup/complete"]; // 네비바 숨길 경로 배열
  const shouldHide = hidePaths.includes(pathname);
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            <Container>
              {!shouldHide && <HeaderNavbar />}
              <MobileWapper>{children}</MobileWapper>
              {!shouldHide && <BottomNavbar />}
            </Container>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

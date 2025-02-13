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
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const hidePaths = ["/login", "/signup", "/setting"]; // 네비바 숨길 경로 배열
  const shouldHide = hidePaths.some((path) => pathname.startsWith(path));
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0077FF" />
      </Head>
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            {loading ? (
              <Loading />
            ) : (
              <Container>
                {!shouldHide && <HeaderNavbar />}
                <MobileWapper>{children}</MobileWapper>
                {!shouldHide && <BottomNavbar />}
              </Container>
            )}
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

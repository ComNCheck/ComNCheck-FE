import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/registry";
import Container from "../components/Container";
import MobileWapper from "../components/MobileWapper";
import ThemeProviderWrapper from "./styles/ThemeProviderWrapper";
import BottomNavbar from "../components/BottomNavbar";
import GlobalStyle from "./styles/globalStyle";
import HeaderNavbar from "@/components/HeaderNavbar";

export const metadata: Metadata = {
  title: "ComNCheck",
  description:
    "GcomNCheck: Ensuring students never miss an important announcement.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            <Container>
              <HeaderNavbar />
              <MobileWapper>{children}</MobileWapper>
              <BottomNavbar />
            </Container>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

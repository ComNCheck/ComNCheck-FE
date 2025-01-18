import type { Metadata } from "next";
import StyledComponentsRegistry from "../lib/registry";
import Container from "../components/Container";
import MobileWapper from "../components/MobileWapper";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import BottomNavbar from "../components/BottomNavbar";

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
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            <Container>
              <MobileWapper>{children}</MobileWapper>
              <BottomNavbar />
            </Container>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

import GlobalClientWrapper from "@/src/components/layouts/GlobalClientWrapper";
import TopLoader from "@/src/components/layouts/TopLoader";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MxQuiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TopLoader />
        <Providers>
          <GlobalClientWrapper>
            {children}
          </GlobalClientWrapper>
        </Providers>
      </body>
    </html>
  );
}

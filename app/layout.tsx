import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ApolloWrapper } from "@/utils/apollo.provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <ApolloWrapper>{children}</ApolloWrapper>
        </Suspense>
      </body>
    </html>
  );
}

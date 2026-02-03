import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Do You Like Me?",
  description: "A fun interactive question.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.youtube.com/iframe_api" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}

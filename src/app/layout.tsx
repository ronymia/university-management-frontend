import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Providers from "@/libs/Providers";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "University Management System",
  description: "University Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${robotoCondensed.variable} antialiased`}>
          {children}
          <div id="dropdown-root"></div>
        </body>
      </html>
    </Providers>
  );
}

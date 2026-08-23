import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/image.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MUSDAA | Makerere University Seventh-day Adventist Association",
    template: "%s | MUSDAA",
  },
  description:
    "Official website of the Makerere University Seventh-day Adventist Association (MUSDAA). Nurturing spiritual growth, Christian fellowship, and mission.",
  keywords: [
    "MUSDAA",
    "Makerere University",
    "Seventh-day Adventist",
    "SDA",
    "Campus Ministry",
    "Uganda",
    "Christian Fellowship",
  ],
  authors: [{ name: "MUSDAA" }],
  icons: {
    icon: logo.src,
    shortcut: logo.src,
    apple: logo.src,
  },
  openGraph: {
    type: "website",
    locale: "en_UG",
    siteName: "MUSDAA",
    title: "MUSDAA | Makerere University SDA Association",
    description:
      "Growing in Faith. Serving in Love. Join the vibrant campus ministry at Makerere University.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

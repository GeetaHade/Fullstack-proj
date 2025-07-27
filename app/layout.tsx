import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Big Star Collectibles - Premium Merchandise & Original Artwork",
  description: "Discover unique merchandise featuring your favorite characters. Quality products made with care and creativity. Shop our collection of hats, shirts, mugs, and aprons.",
  keywords: "collectibles, merchandise, original artwork, premium quality, hats, shirts, mugs, aprons",
  authors: [{ name: "Big Star Collectibles" }],
  openGraph: {
    title: "Big Star Collectibles - Premium Merchandise",
    description: "Discover unique merchandise featuring your favorite characters. Quality products made with care and creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

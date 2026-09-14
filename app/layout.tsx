import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "India at the Olympics — History, Medals & Athletes",
    template: "%s | India at the Olympics",
  },
  description:
    "A comprehensive historical archive of India's participation and achievements in the Summer and Winter Olympic Games from 1900 to present.",
  keywords: [
    "India Olympics",
    "Indian Olympic medals",
    "Olympic history India",
    "Neeraj Chopra",
    "Abhinav Bindra",
    "Indian hockey Olympics",
    "Olympic athletes India",
  ],
  openGraph: {
    title: "India at the Olympics — History, Medals & Athletes",
    description:
      "A comprehensive historical archive of India's participation and achievements in the Summer and Winter Olympic Games.",
    type: "website",
    locale: "en_US",
    siteName: "India at the Olympics",
  },
  twitter: {
    card: "summary_large_image",
    title: "India at the Olympics — History, Medals & Athletes",
    description:
      "A comprehensive historical archive of India's participation and achievements in the Summer and Winter Olympic Games.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

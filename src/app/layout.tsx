
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Mobile from './components/mobile/mobile'
import { ReduxProvider } from '@/components/providers/ReduxProvider'
import Footer from './components/footer/footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"




  // Clean up the interval when the component unmounts

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raw Wood",
  description: "Your New Movies Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html lang='en' suppressHydrationWarning>
    
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased layout-body pb-16 lg:pb-0`}
      >

        <Header />
          <div className="layout-container">
          <ReduxProvider>{children}</ReduxProvider>
          <Footer />
        </div>
        <Mobile />
        <Analytics/>
        <SpeedInsights/>
      </body>
      
    </html>
  );
}

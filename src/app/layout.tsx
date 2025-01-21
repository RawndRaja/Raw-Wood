
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
  title: "RAW Cinemas - Unmatched Movie Experience",
  description: "Enjoy the ultimate cinematic experience at RAW Cinemas. Discover the latest movies, book tickets online, and indulge in premium entertainment with state-of-the-art technology and comfort.",
  keywords: ["cinema", "movie theater", "latest movies", "online booking", "premium entertainment", "RAW Cinemas"],
  authors: [{ name: "RAW Cinemas" }],
  openGraph: {
    type: "website",
    url: "https://rawcinemas.vercel.app/",
    title: "RAW Cinemas - Unmatched Movie Experience",
    description: "Explore the latest movies and enjoy a world-class cinematic experience with RAW Cinemas. Book tickets, view showtimes, and more.",
    images: [
      {
        url: "https://rawcinemas.vercel.app/images/icon.png",
        width: 1200,
        height: 630,
        alt: "RAW Cinemas - Cinematic Experience",
      },
    ],
    siteName: "RAW Cinemas",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rawcinemas",
    title: "RAW Cinemas - Unmatched Movie Experience",
    description: "Discover premium entertainment with RAW Cinemas. View showtimes, book tickets online, and enjoy the latest films.",
    images: ["https://rawcinemas.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html lang='en' suppressHydrationWarning>
        <head>
          
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="canonical" href="https://rawcinemas.vercel.app/" />
        <meta name="google-adsense-account" content="ca-pub-5692786874442235" />

        </head>

    
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

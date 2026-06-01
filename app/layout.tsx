import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Popup from "@/components/Popup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Property Marketplace",
  description: "Find your perfect property across India",
  verification: {
    google: "Mr6-iBds2a8-YtrECYuMYzGh0j4lGVo-j3UCXn8ipAE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-body text-text-primary bg-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-10V0D0SKH6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-10V0D0SKH6');
          `}
        </Script>
        {children}
        <Popup />
      </body>
    </html>
  );
}

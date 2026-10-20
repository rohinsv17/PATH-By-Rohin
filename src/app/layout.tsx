import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sitewide font
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Site metadata
export const metadata: Metadata = {
  title: "PATH By Rohin",
  icons: {
    icon: "/pathIcon.svg",
  },
  description: "High School Advice, Code Camps & Tutoring, and Personal Projects",
};

// Root layout wraps every page
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang = "en" data-scroll-behavior = "smooth" className = "scroll-smooth snap-y snap-mandatory">
      <body className = {poppins.className}>

        {/* Persistent nav across all routes */}
        <Navbar />

        {/* Injected page content based on current route */}
        <main>{children}</main>

        {/* Persistent footer across all routes */}
        <Footer />
      </body>
    </html>
  );
}
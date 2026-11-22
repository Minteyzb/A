import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: { default: "Mintesinot Zenebe — Electrical & Computer Engineer", template: "%s | Mintesinot Zenebe" },
  description: "Industrial control, embedded systems and PCB design from Adama, Ethiopia. Projects, blog and resume.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

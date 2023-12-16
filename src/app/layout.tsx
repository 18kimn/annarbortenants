import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";

const pt_sans = PT_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ann Arbor Tenants Union",
  description:
    "The Ann Arbor Tenants Union is a collective of tenants working together to improve rentership for all in the Ann Arbor area.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pt_sans.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

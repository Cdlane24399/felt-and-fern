import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/client-providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "PURRFECT | Thoughtfully Designed Cat Products",
  description:
    "Minimal, sustainable cat products made from natural materials. Designed for cats and their humans.",
  keywords: ["cat products", "cat toys", "cat furniture", "sustainable", "natural"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ClientProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

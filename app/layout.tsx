import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shree Sanvariya Seth Traders | Pharmaceutical Trading Company",
  description:
    "Official company website of Shree Sanvariya Seth Traders, Bhopal. Corporate information, product categories and business contact details.",
  metadataBase: new URL("https://www.shreesanvariya.co.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shree Sanvariya Seth Traders",
    description: "Professional pharmaceutical trading and supply company profile.",
    type: "website",
    url: "https://www.shreesanvariya.co.in",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

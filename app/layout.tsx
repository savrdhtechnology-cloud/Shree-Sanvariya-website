import type { Metadata } from "next";
import "./globals.css";
import "./pages.css";
import "./animations.css";
import "./product-cards.css";

export const metadata: Metadata = {
  title: "Shree Sanvariya Seth Traders | Corporate Website",
  description: "Official corporate information website of Shree Sanvariya Seth Traders, Bhopal, Madhya Pradesh.",
  metadataBase: new URL("https://www.shreesanvariya.co.in"),
  openGraph: {
    title: "Shree Sanvariya Seth Traders",
    description: "Professional pharmaceutical trading company profile and corporate information.",
    type: "website",
    url: "https://www.shreesanvariya.co.in",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

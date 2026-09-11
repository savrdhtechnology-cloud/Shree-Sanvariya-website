import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { business } from "@/lib/config";

const customerPreview = process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_CUSTOMER_PREVIEW === "true";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: { default: `${business.name} | Trusted Pre-Owned Cars in Bhopal`, template: `%s | ${business.name}` },
  description: "Discover pre-owned cars in Bhopal, sell your car, request finance options and connect with Shashwat Cars.",
  openGraph: { title: business.name, description: "Quality Used Cars. Transparent Deals. Trusted Service.", type: "website" },
  robots: { index: true, follow: true }
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>
        {customerPreview && (
          <div className="preview-banner">Customer Preview • Demo Inventory • Enquiries are not stored</div>
        )}<SiteHeader/><main>{children}</main><Footer/><MobileBar/></body></html>}

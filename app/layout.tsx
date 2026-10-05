import type { Metadata } from "next";
import "./globals.css";
import "./pages.css";
import "./animations.css";
import "./product-cards.css";
import "./allino.css";

export const metadata: Metadata = {
  title: "ALLINO FOODS & RESTAURANTS | One Destination for Great Food",
  description: "Discover food, restaurants, home chefs, cloud kitchens and premium food products with Allino.",
  openGraph: { title: "ALLINO FOODS & RESTAURANTS", description: "One destination for great food.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

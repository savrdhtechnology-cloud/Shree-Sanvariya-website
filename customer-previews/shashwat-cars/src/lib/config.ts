export const business = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Shashwat Cars",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || process.env.NEXT_PUBLIC_BUSINESS_PHONE || "",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "Bhopal, Madhya Pradesh",
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://maps.app.goo.gl/7eETkdsRbZxSg2u2A",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export function whatsappHref(message: string) {
  const digits = business.whatsapp.replace(/\D/g, "");
  if (!digits) return "/contact";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function phoneHref() {
  const digits = business.phone.replace(/[^+\d]/g, "");
  return digits ? `tel:${digits}` : "/contact";
}

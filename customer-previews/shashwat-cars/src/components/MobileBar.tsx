import Link from "next/link";
import { phoneHref, whatsappHref } from "@/lib/config";
export function MobileBar(){ return <div className="mobile-bar"><Link href="/cars">🚗 Cars</Link><a href={whatsappHref("Hello, I would like to know more about available cars.")}>💬 WhatsApp</a><a href={phoneHref()}>📞 Call</a></div> }

import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";
import type { LeadType } from "@/lib/types";
import { rateLimit } from "@/lib/rate-limit";

const allowed = new Set<LeadType>(["BUYER", "SELLER", "FINANCE", "GENERAL", "INSPECTION", "PRICE_REQUEST"]);

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limit = rateLimit(`lead:${ip}`);
    if (!limit.ok) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });

    const body = await req.json();
    if (String(body.company || "").trim()) return NextResponse.json({ ok: true }, { status: 201 });

    const name = String(body.name || "").trim();
    const mobile = String(body.mobile || "").replace(/\D/g, "");
    const type = String(body.type || "") as LeadType;
    if (!allowed.has(type) || name.length < 2 || mobile.length < 10 || mobile.length > 15) {
      return NextResponse.json({ error: "Please provide a valid name, mobile number and enquiry type." }, { status: 400 });
    }

    const known = new Set(["type", "name", "mobile", "email", "vehicleId", "vehicleName", "message", "city", "company"]);
    const payload = Object.fromEntries(Object.entries(body).filter(([k]) => !known.has(k)));
    const lead = await createLead({
      type, name, mobile,
      email: String(body.email || "").trim() || undefined,
      vehicleId: String(body.vehicleId || "") || undefined,
      vehicleName: String(body.vehicleName || "") || undefined,
      message: String(body.message || "").slice(0, 2000) || undefined,
      city: String(body.city || "") || undefined,
      source: "website",
      payload,
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to save enquiry" }, { status: 503 });
  }
}

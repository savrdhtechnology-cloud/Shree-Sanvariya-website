import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/auth";
import { updateLead } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminSession()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await req.json();
    const allowed = ["status", "nextFollowUp", "assignedStaff", "message"];
    const patch = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
    const lead = await updateLead(id, patch as any);
    return NextResponse.json({ lead });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 503 });
  }
}

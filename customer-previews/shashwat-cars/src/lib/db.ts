import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import type { Lead, Vehicle, VehicleStatus } from "./types";
import { demoVehicles } from "./demo";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const localDir = path.join(process.cwd(), ".data");

function hasSupabase() { return Boolean(url && key); }
function isCustomerPreview() { return process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_CUSTOMER_PREVIEW === "true"; }

function headers(prefer?: string) {
  return {
    apikey: key || "",
    Authorization: `Bearer ${key || ""}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function rest<T>(resource: string, init?: RequestInit): Promise<T> {
  if (!url || !key) throw new Error("Database is not configured");
  const response = await fetch(`${url}/rest/v1/${resource}`, {
    ...init,
    headers: { ...headers(), ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Database request failed (${response.status})`);
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

function fromDbVehicle(row: any): Vehicle {
  return {
    id: String(row.id), slug: row.slug, brand: row.brand, model: row.model, variant: row.variant || "", year: row.year,
    price: Number(row.price), fuel: row.fuel, transmission: row.transmission, kmDriven: row.km_driven, bodyType: row.body_type,
    color: row.color || undefined, ownership: row.ownership, registration: row.registration || undefined,
    registrationState: row.registration_state || undefined, location: row.location, status: row.status as VehicleStatus,
    description: row.description || "", features: row.features || [], highlights: row.highlights || [], images: row.images || ["/vehicle-placeholder.svg"],
    featured: Boolean(row.featured), createdAt: row.created_at
  };
}

function toDbVehicle(v: Partial<Vehicle>) {
  return {
    ...(v.slug !== undefined && { slug: v.slug }), ...(v.brand !== undefined && { brand: v.brand }), ...(v.model !== undefined && { model: v.model }),
    ...(v.variant !== undefined && { variant: v.variant }), ...(v.year !== undefined && { year: v.year }), ...(v.price !== undefined && { price: v.price }),
    ...(v.fuel !== undefined && { fuel: v.fuel }), ...(v.transmission !== undefined && { transmission: v.transmission }),
    ...(v.kmDriven !== undefined && { km_driven: v.kmDriven }), ...(v.bodyType !== undefined && { body_type: v.bodyType }),
    ...(v.color !== undefined && { color: v.color }), ...(v.ownership !== undefined && { ownership: v.ownership }),
    ...(v.registration !== undefined && { registration: v.registration }), ...(v.registrationState !== undefined && { registration_state: v.registrationState }),
    ...(v.location !== undefined && { location: v.location }), ...(v.status !== undefined && { status: v.status }),
    ...(v.description !== undefined && { description: v.description }), ...(v.features !== undefined && { features: v.features }),
    ...(v.highlights !== undefined && { highlights: v.highlights }), ...(v.images !== undefined && { images: v.images }),
    ...(v.featured !== undefined && { featured: v.featured })
  };
}

export async function getVehicles(opts: { includeHidden?: boolean } = {}): Promise<Vehicle[]> {
  if (hasSupabase()) {
    const hidden = opts.includeHidden ? "" : "&status=neq.HIDDEN";
    const rows = await rest<any[]>(`vehicles?select=*&order=created_at.desc${hidden}`);
    return rows.map(fromDbVehicle);
  }
  return process.env.NODE_ENV === "production" && !isCustomerPreview() ? [] : demoVehicles;
}

export async function getVehicleBySlug(slug: string) {
  const all = await getVehicles();
  return all.find(v => v.slug === slug) || null;
}

export async function createVehicle(v: Omit<Vehicle, "id">) {
  if (!hasSupabase()) throw new Error("Configure Supabase before creating production inventory");
  const rows = await rest<any[]>("vehicles", { method: "POST", headers: headers("return=representation"), body: JSON.stringify(toDbVehicle(v)) });
  return fromDbVehicle(rows[0]);
}

export async function updateVehicle(id: string, patch: Partial<Vehicle>) {
  if (!hasSupabase()) throw new Error("Configure Supabase before editing production inventory");
  const rows = await rest<any[]>(`vehicles?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: headers("return=representation"), body: JSON.stringify(toDbVehicle(patch)) });
  return rows[0] ? fromDbVehicle(rows[0]) : null;
}

export async function deleteVehicle(id: string) {
  if (!hasSupabase()) throw new Error("Configure Supabase before deleting production inventory");
  await rest(`vehicles?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: headers("return=minimal") });
}

async function localLeads(): Promise<Lead[]> {
  await fs.mkdir(localDir, { recursive: true });
  const file = path.join(localDir, "leads.json");
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return []; }
}

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: Lead["status"] }) {
  const lead: Lead = { ...input, id: randomUUID(), status: input.status || "NEW", createdAt: new Date().toISOString() };
  if (hasSupabase()) {
    await rest("leads", { method: "POST", headers: headers("return=minimal"), body: JSON.stringify({
      id: lead.id, type: lead.type, status: lead.status, name: lead.name, mobile: lead.mobile, email: lead.email || null,
      vehicle_id: lead.vehicleId || null, vehicle_name: lead.vehicleName || null, source: lead.source || "website", city: lead.city || null,
      next_follow_up: lead.nextFollowUp || null, assigned_staff: lead.assignedStaff || null, message: lead.message || null, payload: lead.payload || {}, created_at: lead.createdAt
    }) });
    return lead;
  }
  if (isCustomerPreview()) return lead;
  if (process.env.NODE_ENV === "production") throw new Error("Lead database is not configured");
  const leads = await localLeads(); leads.unshift(lead);
  await fs.writeFile(path.join(localDir, "leads.json"), JSON.stringify(leads, null, 2));
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  if (hasSupabase()) {
    const rows = await rest<any[]>("leads?select=*&order=created_at.desc");
    return rows.map(row => ({ id: row.id, type: row.type, status: row.status, name: row.name, mobile: row.mobile, email: row.email || undefined,
      vehicleId: row.vehicle_id || undefined, vehicleName: row.vehicle_name || undefined, source: row.source || undefined, city: row.city || undefined,
      nextFollowUp: row.next_follow_up || undefined, assignedStaff: row.assigned_staff || undefined, message: row.message || undefined, payload: row.payload || {}, createdAt: row.created_at }));
  }
  if (isCustomerPreview()) return [];
  return process.env.NODE_ENV === "production" ? [] : localLeads();
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, "status" | "nextFollowUp" | "assignedStaff" | "message">>) {
  if (hasSupabase()) {
    const payload: Record<string, unknown> = {};
    if (patch.status !== undefined) payload.status = patch.status;
    if (patch.nextFollowUp !== undefined) payload.next_follow_up = patch.nextFollowUp || null;
    if (patch.assignedStaff !== undefined) payload.assigned_staff = patch.assignedStaff || null;
    if (patch.message !== undefined) payload.message = patch.message || null;
    const rows = await rest<any[]>(`leads?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", headers: headers("return=representation"), body: JSON.stringify(payload) });
    return rows[0] || null;
  }
  if (process.env.NODE_ENV === "production") throw new Error("Lead database is not configured");
  const leads = await localLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index < 0) return null;
  leads[index] = { ...leads[index], ...patch };
  await fs.writeFile(path.join(localDir, "leads.json"), JSON.stringify(leads, null, 2));
  return leads[index];
}

export function databaseConfigured() { return hasSupabase(); }

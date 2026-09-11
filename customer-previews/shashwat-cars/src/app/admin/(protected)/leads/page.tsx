import { getLeads } from "@/lib/db";
import { AdminLeads } from "@/components/AdminLeads";
export default async function Page(){const leads=await getLeads();return <><div className="admin-head"><div><p className="eyebrow">CRM</p><h1>Leads & Follow-ups</h1></div></div><AdminLeads initial={leads}/></>}

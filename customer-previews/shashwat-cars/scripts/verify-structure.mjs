import { existsSync, readFileSync } from "node:fs";
const required=["src/app/page.tsx","src/app/cars/page.tsx","src/app/cars/[slug]/page.tsx","src/app/sell-your-car/page.tsx","src/app/finance/page.tsx","src/app/admin/(protected)/page.tsx","src/app/admin/(protected)/inventory/page.tsx","src/app/admin/(protected)/leads/page.tsx","src/app/api/leads/route.ts","supabase/schema.sql"];
let ok=true;for(const f of required){if(!existsSync(f)){console.error("MISSING",f);ok=false}else console.log("OK",f)}
const pkg=JSON.parse(readFileSync("package.json","utf8"));if(pkg.dependencies.next!=="16.3.4"){console.error("Unexpected Next.js version");ok=false}else console.log("OK Next.js",pkg.dependencies.next);
process.exit(ok?0:1);

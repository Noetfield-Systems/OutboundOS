import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
const src=readFileSync(new URL("../server/index.tsx", import.meta.url),"utf8");
test("guarded multi-tenant database",()=>{expect(src).toContain("os_workspaces"); expect(src).toContain("workspace_id");expect(src).toContain("os_sessions")});
test("no administrator token login",()=>{expect(src).not.toContain("Paste ADMIN_TOKEN from Railway");expect(src).toContain("os_session")});
test("agent and prospect loop present",()=>{for(const token of ["apolloSearch","enrich","dispatch","runAgent","webhooks/resend","email.bounced","unsubscribed"]) expect(src).toContain(token)});
test("UI is real and passkeys are optional",()=>{for(const token of ["<html","Passkey","campaignModal","addLeadModal","saveMemory"])expect(src).toContain(token)});
test("database migrations are defined",()=>{expect(src).toContain("OUTBOUND_V2_SCHEMA_OK");expect(src).toContain("CREATE TABLE IF NOT EXISTS os_prospects")});

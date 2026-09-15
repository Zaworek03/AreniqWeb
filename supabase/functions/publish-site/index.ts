// Supabase Edge Function: rebuild the static site after content changes in the admin panel.
// Deploy: supabase functions deploy publish-site
// Secrets: supabase secrets set GITHUB_TOKEN=<fine-grained token, repo Contents: read & write> GITHUB_REPO=Zaworek03/AreniqWeb
// The token never reaches the browser; only signed-in admins can trigger a dispatch.

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("Authorization") ?? "";
  const url = Deno.env.get("SUPABASE_URL")!;

  // Act as the caller, so is_admin() and RLS see their identity.
  const asCaller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userError } = await asCaller.auth.getUser();
  if (userError || !userData.user) return json({ error: "Unauthorized" }, 401);
  const { data: isAdmin } = await asCaller.rpc("is_admin");
  if (isAdmin !== true) return json({ error: "Forbidden" }, 403);

  const token = Deno.env.get("GITHUB_TOKEN");
  const repo = Deno.env.get("GITHUB_REPO");
  if (!token || !repo) return json({ error: "GITHUB_TOKEN or GITHUB_REPO not set" }, 500);

  const gh = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "areniq-admin",
    },
    body: JSON.stringify({ event_type: "publish-content" }),
  });
  if (!gh.ok) return json({ error: `GitHub ${gh.status}` }, 502);

  const lastPublish = { at: new Date().toISOString(), by: userData.user.email ?? "admin" };
  await asCaller.from("site_content").upsert({ key: "last_publish", value: lastPublish, updated_at: lastPublish.at });
  return json(lastPublish);
});

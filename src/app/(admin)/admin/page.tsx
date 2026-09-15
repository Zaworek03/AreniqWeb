import { AdminApp } from "@/components/admin/admin-app";

// Static shell; everything behind the login is fetched in the browser under Supabase RLS.
export default function AdminPage() {
  return <AdminApp />;
}

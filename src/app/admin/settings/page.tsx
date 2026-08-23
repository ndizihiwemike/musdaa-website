import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = {
  title: "Settings – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key");

  // Convert to a simple key → value map for the form
  const settingsMap: Record<string, string> = {};
  if (settings) {
    for (const row of settings) {
      settingsMap[row.key] = row.value ?? "";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-1 text-gray-600">
          Basic site-wide configuration. These values can be used across the
          public website.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load settings. Make sure you have run the latest{" "}
          <code className="bg-amber-100 px-1 rounded">schema.sql</code> (includes{" "}
          <code className="bg-amber-100 px-1 rounded">site_settings</code> table).
        </div>
      )}

      <SettingsForm initialSettings={settingsMap} />
    </div>
  );
}

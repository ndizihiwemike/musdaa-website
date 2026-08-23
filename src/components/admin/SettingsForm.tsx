"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save } from "lucide-react";

const FIELDS = [
  { key: "site_name", label: "Site Name", placeholder: "MUSDAA" },
  {
    key: "site_tagline",
    label: "Tagline",
    placeholder: "Makerere University Seventh-day Adventist Association",
  },
  { key: "contact_email", label: "Contact Email", placeholder: "info@musdaa.org" },
  { key: "contact_phone", label: "Contact Phone", placeholder: "+256 XXX XXX XXX" },
  {
    key: "location",
    label: "Location",
    placeholder: "Makerere University Main Campus, Kampala, Uganda",
  },
  { key: "facebook_url", label: "Facebook URL", placeholder: "https://facebook.com/..." },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { key: "youtube_url", label: "YouTube URL", placeholder: "https://youtube.com/..." },
  {
    key: "whatsapp_url",
    label: "WhatsApp Group or Community Link",
    placeholder: "https://chat.whatsapp.com/...",
  },
  {
    key: "whatsapp_channel_url",
    label: "WhatsApp Channel Link",
    placeholder: "https://whatsapp.com/channel/...",
  },
];

interface SettingsFormProps {
  initialSettings: Record<string, string>;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();

    // Upsert each setting
    const rows = Object.entries(values).map(([key, value]) => ({
      key,
      value: value.trim() || null,
    }));

    const { error: upsertError } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type="text"
              value={values[field.key] ?? ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          Settings saved successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {loading ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  id: string;
  name: string;
}

export default function DeleteMinistryButton({ id, name }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete “${name}”? This cannot be undone.`)) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("ministries").delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
      setLoading(false);
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      Delete
    </button>
  );
}

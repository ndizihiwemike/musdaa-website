"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check, Loader2 } from "lucide-react";

export default function MarkAsReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMark() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleMark}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-200 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Check className="h-3.5 w-3.5" />
      )}
      Mark read
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteFile } from "@/lib/supabase/storage";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  id: string;
  imageUrl: string;
}

export default function DeleteGalleryButton({ id, imageUrl }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this photo?")) return;
    setLoading(true);

    const supabase = createClient();
    // Delete from storage
    await deleteFile("gallery", imageUrl);
    // Delete from DB
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);

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
      className="inline-flex items-center gap-1 rounded bg-red-600/90 px-2 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
      Delete
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import type { Announcement } from "@/types";

interface AnnouncementFormProps {
  announcement?: Announcement | null;
  mode: "create" | "edit";
}

export default function AnnouncementForm({
  announcement,
  mode,
}: AnnouncementFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(announcement?.title || "");
  const [content, setContent] = useState(announcement?.content || "");
  const [date, setDate] = useState(
    announcement?.date || new Date().toISOString().slice(0, 10)
  );
  const [isPinned, setIsPinned] = useState(announcement?.is_pinned || false);
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const payload = {
      title: title.trim(),
      content: content.trim(),
      date,
      is_pinned: isPinned,
      is_published: isPublished,
    };

    if (mode === "create") {
      const { error: insertError } = await supabase
        .from("announcements")
        .insert(payload);
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    } else if (announcement?.id) {
      const { error: updateError } = await supabase
        .from("announcements")
        .update(payload)
        .eq("id", announcement.id);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/announcements");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPinned}
            onChange={(e) => setIsPinned(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Pinned</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Published</span>
        </label>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Announcement" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

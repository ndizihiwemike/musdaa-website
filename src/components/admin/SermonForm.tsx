"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/supabase/storage";
import { Loader2, Upload, X } from "lucide-react";
import type { Sermon } from "@/types";

interface SermonFormProps {
  sermon?: Sermon | null;
  mode: "create" | "edit";
}

export default function SermonForm({ sermon, mode }: SermonFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(sermon?.title || "");
  const [speaker, setSpeaker] = useState(sermon?.speaker || "");
  const [date, setDate] = useState(sermon?.date || "");
  const [description, setDescription] = useState(sermon?.description || "");
  const [series, setSeries] = useState(sermon?.series || "");
  const [videoUrl, setVideoUrl] = useState(sermon?.video_url || "");
  const [audioUrl, setAudioUrl] = useState(sermon?.audio_url || "");
  const [documentUrl, setDocumentUrl] = useState(sermon?.document_url || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(sermon?.thumbnail_url || "");
  const [isPublished, setIsPublished] = useState(true);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(sermon?.thumbnail_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function clearThumbnail() {
    setThumbnailFile(null);
    setPreview(null);
    setThumbnailUrl("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    let finalThumbnail = thumbnailUrl;

    if (thumbnailFile) {
      const { url, error: uploadError } = await uploadFile("sermons", thumbnailFile);
      if (uploadError || !url) {
        setError(uploadError || "Thumbnail upload failed");
        setLoading(false);
        return;
      }
      finalThumbnail = url;
    }

    const payload = {
      title: title.trim(),
      speaker: speaker.trim(),
      date,
      description: description.trim() || null,
      series: series.trim() || null,
      video_url: videoUrl.trim() || null,
      audio_url: audioUrl.trim() || null,
      document_url: documentUrl.trim() || null,
      thumbnail_url: finalThumbnail || null,
      is_published: isPublished,
    };

    if (mode === "create") {
      const { error: insertError } = await supabase.from("sermons").insert(payload);
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    } else if (sermon?.id) {
      const { error: updateError } = await supabase
        .from("sermons")
        .update(payload)
        .eq("id", sermon.id);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/sermons");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speaker <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Series</label>
        <input
          type="text"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          placeholder="e.g. Faith Series"
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Media URLs */}
      <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-700">Media Links</p>
        <div>
          <label className="block text-xs font-medium text-gray-500">Video URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Audio URL</label>
          <input
            type="url"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">Document / Notes URL</label>
          <input
            type="url"
            value={documentUrl}
            onChange={(e) => setDocumentUrl(e.target.value)}
            placeholder="https://..."
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Thumbnail Image
        </label>
        {preview ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="h-36 w-64 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={clearThumbnail}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
            <Upload className="h-7 w-7 text-gray-400" />
            <span className="mt-1 text-sm text-gray-500">Upload thumbnail</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
          </label>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Published</span>
      </label>

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
          {mode === "create" ? "Create Sermon" : "Save Changes"}
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

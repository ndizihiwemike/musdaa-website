"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/supabase/storage";
import { Loader2, Upload, X } from "lucide-react";
import type { Ministry } from "@/types";

interface MinistryFormProps {
  ministry?: Ministry | null;
  mode: "create" | "edit";
}

export default function MinistryForm({ ministry, mode }: MinistryFormProps) {
  const router = useRouter();
  const [name, setName] = useState(ministry?.name || "");
  const [description, setDescription] = useState(ministry?.description || "");
  const [leader, setLeader] = useState(ministry?.leader || "");
  const [meetingTime, setMeetingTime] = useState(ministry?.meeting_time || "");
  const [imageUrl, setImageUrl] = useState(ministry?.image_url || "");
  const [isActive, setIsActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(ministry?.image_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function clearImage() {
    setImageFile(null);
    setPreview(null);
    setImageUrl("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    let finalImage = imageUrl;

    if (imageFile) {
      const { url, error: uploadError } = await uploadFile("gallery", imageFile);
      if (uploadError || !url) {
        setError(uploadError || "Image upload failed");
        setLoading(false);
        return;
      }
      finalImage = url;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      leader: leader.trim() || null,
      meeting_time: meetingTime.trim() || null,
      image_url: finalImage || null,
      is_active: isActive,
    };

    if (mode === "create") {
      const { error: insertError } = await supabase.from("ministries").insert(payload);
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    } else if (ministry?.id) {
      const { error: updateError } = await supabase
        .from("ministries")
        .update(payload)
        .eq("id", ministry.id);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
    }

    router.push("/admin/ministries");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Leader</label>
          <input
            type="text"
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Meeting Time</label>
          <input
            type="text"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            placeholder="e.g. Sabbaths after service"
            className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
        {preview ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="h-32 w-48 object-cover rounded-lg border" />
            <button type="button" onClick={clearImage} className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
            <Upload className="h-7 w-7 text-gray-400" />
            <span className="mt-1 text-sm text-gray-500">Upload image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        )}
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Active</span>
      </label>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create Ministry" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

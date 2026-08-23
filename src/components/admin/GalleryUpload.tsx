"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/supabase/storage";
import { Upload, Loader2, X, CheckCircle2 } from "lucide-react";

export default function GalleryUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState(0);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    setSuccessCount(0);
    setError(null);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setLoading(true);
    setError(null);
    setProgress(0);
    setSuccessCount(0);

    const supabase = createClient();
    let uploaded = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { url, error: uploadError } = await uploadFile("gallery", file);

      if (uploadError || !url) {
        setError(`Failed on "${file.name}": ${uploadError}`);
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("gallery_items").insert({
        title: file.name.replace(/\.[^/.]+$/, ""),
        image_url: url,
        category: category.trim() || null,
        is_published: true,
      });

      if (insertError) {
        const message =
          insertError.code === "42501"
            ? "Your account needs an editor or admin role in public.profiles."
            : insertError.message;
        setError(`DB error on "${file.name}": ${message}`);
        setLoading(false);
        return;
      }

      uploaded++;
      setProgress(Math.round((uploaded / files.length) * 100));
      setSuccessCount(uploaded);
    }

    setFiles([]);
    setCategory("");
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Photos</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category (optional)
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Worship, Outreach, Youth"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-600">
          Click or drag images here (multiple allowed)
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            {files.length} file{files.length > 1 ? "s" : ""} selected
          </p>
          <ul className="max-h-40 overflow-y-auto space-y-1">
            {files.map((f, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded px-3 py-1.5"
              >
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          {loading && (
            <div className="mt-2">
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Uploading… {successCount}/{files.length}
              </p>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {loading ? "Uploading…" : `Upload ${files.length} photo${files.length > 1 ? "s" : ""}`}
          </button>
        </div>
      )}

      {successCount > 0 && !loading && (
        <div className="mt-4 flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          {successCount} photo{successCount > 1 ? "s" : ""} uploaded successfully.
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}

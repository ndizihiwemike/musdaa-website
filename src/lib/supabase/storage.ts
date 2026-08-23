import { createClient } from "@/lib/supabase/client";

/**
 * Upload a file to a Supabase Storage bucket.
 * Returns the public URL on success.
 */
export async function uploadFile(
  bucket: "events" | "sermons" | "gallery" | "avatars",
  file: File,
  path?: string
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = path || `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return { url: publicUrl, error: null };
}

/**
 * Delete a file from a bucket given its public URL or path.
 */
export async function deleteFile(
  bucket: "events" | "sermons" | "gallery" | "avatars",
  pathOrUrl: string
): Promise<{ error: string | null }> {
  const supabase = createClient();

  // Extract path if a full URL was passed
  let path = pathOrUrl;
  if (pathOrUrl.includes("/storage/v1/object/public/")) {
    path = pathOrUrl.split(`/storage/v1/object/public/${bucket}/`)[1] || pathOrUrl;
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);

  return { error: error?.message || null };
}

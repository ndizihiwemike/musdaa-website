import { createClient } from "@/lib/supabase/server";
import { ImageIcon } from "lucide-react";
import GalleryUpload from "@/components/admin/GalleryUpload";
import DeleteGalleryButton from "@/components/admin/DeleteGalleryButton";
import { format, parseISO } from "date-fns";

export const metadata = {
  title: "Gallery – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <p className="mt-1 text-gray-600">
          Upload and manage photos. Supports multiple file selection.
        </p>
      </div>

      <GalleryUpload />

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load gallery items.
        </div>
      )}

      {!error && (!items || items.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <ImageIcon className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No photos yet. Upload some above.</p>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl border border-gray-200 overflow-hidden bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title || "Gallery photo"}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="w-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium truncate">
                    {item.title || "Untitled"}
                  </p>
                  {item.category && (
                    <p className="text-white/80 text-xs">{item.category}</p>
                  )}
                  <div className="mt-2">
                    <DeleteGalleryButton id={item.id} imageUrl={item.image_url} />
                  </div>
                </div>
              </div>
              {!item.is_published && (
                <span className="absolute top-2 left-2 rounded bg-gray-800/80 px-2 py-0.5 text-xs text-white">
                  Draft
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

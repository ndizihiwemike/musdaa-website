import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Gallery & Resources",
  description:
    "Photos from MUSDAA events, programs, and community life plus useful resources.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: galleryItems } = await supabase
    .from("gallery_items")
    .select("id, title, image_url, category, event_date")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Memories & Resources
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Gallery & Resources
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Glimpses of life at MUSDAA and helpful materials for spiritual
            growth.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Photo Gallery"
            description="Moments of worship, fellowship, and service."
          />

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems && galleryItems.length > 0
              ? galleryItems.map((item) => (
                  <figure
                    key={item.id}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.title || "MUSDAA gallery photo"}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {(item.title || item.category) && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8 text-sm text-white">
                        {item.title || item.category}
                      </figcaption>
                    )}
                  </figure>
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center"
                  >
                    <ImageIcon className="h-10 w-10 text-blue-400" />
                  </div>
                ))}
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Sabbath School Study Guides",
                "Devotional Materials",
                "MUSDAA Constitution (members)",
                "Ministry Guidelines",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-100 p-5 flex items-center justify-between"
                >
                  <span className="font-medium text-gray-900">{item}</span>
                  <span className="text-sm text-gray-400">Coming soon</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

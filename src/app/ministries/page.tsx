import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { ministries as placeholderMinistries } from "@/data/placeholder";
import type { Ministry } from "@/types";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Ministries & Projects",
  description:
    "Explore the various ministries and projects of MUSDAA — Youth, Music, Outreach, Health, Prayer, and more.",
};

export default async function MinistriesPage() {
  let items: Ministry[] = placeholderMinistries;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ministries")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (!error && data && data.length > 0) {
      items = data;
    }
  } catch {
    // Fall back to placeholder data
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Serve & Grow
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Ministries & Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Find your place to serve, grow, and make a difference within MUSDAA
            and beyond the campus.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Ministries"
            description="Every member has a gift. Discover where you can plug in and serve."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((ministry) => (
              <article
                key={ministry.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {ministry.name}
                </h3>
                {ministry.description && (
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {ministry.description}
                  </p>
                )}
                {ministry.leader && (
                  <p className="mt-3 text-sm text-gray-500">
                    Leader: {ministry.leader}
                  </p>
                )}
                {ministry.meeting_time && (
                  <p className="mt-1 text-sm font-medium text-blue-700">
                    Meets: {ministry.meeting_time}
                  </p>
                )}
              </article>
            ))}
          </div>

          {items.length === 0 && (
            <p className="mt-12 text-center text-gray-500">
              Ministries will appear here soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SermonCard from "@/components/SermonCard";
import { createClient } from "@/lib/supabase/server";
import { recentSermons } from "@/data/placeholder";
import type { Sermon } from "@/types";

export const metadata: Metadata = {
  title: "Sermons & Livestream",
  description:
    "Watch and listen to recent sermons from MUSDAA worship services. Grow in the Word anytime, anywhere.",
};

export default async function SermonsPage() {
  let sermons: Sermon[] = recentSermons;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false });

    if (!error && data && data.length > 0) {
      sermons = data;
    }
  } catch {
    // Fall back to placeholder data
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Grow in the Word
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Sermons & Livestream
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Access inspiring messages from our worship services. Video, audio,
            and notes available when provided.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Recent Messages"
            description="Catch up on the latest sermons or revisit a favourite series."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>

          {sermons.length === 0 && (
            <p className="mt-12 text-center text-gray-500">
              No sermons available yet. Check back soon!
            </p>
          )}

          <div className="mt-16 rounded-2xl bg-slate-900 text-white p-8 sm:p-10 text-center">
            <h3 className="text-2xl font-bold">Livestream</h3>
            <p className="mt-3 text-slate-300 max-w-xl mx-auto">
              When available, our Sabbath services are livestreamed. Check this
              page or our social channels on Sabbath mornings for the live link.
            </p>
            <div className="mt-6 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-medium ring-1 ring-white/20">
              Livestream link will appear here when active
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

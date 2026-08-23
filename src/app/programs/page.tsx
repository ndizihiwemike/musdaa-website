import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { announcements as placeholderAnnouncements } from "@/data/placeholder";
import type { Announcement } from "@/types";
import { BookOpen, CalendarDays, Megaphone } from "lucide-react";
import { format, parseISO } from "date-fns";

export const metadata: Metadata = {
  title: "Programs & Bulletin",
  description:
    "Weekly programs, order of service, and announcements from MUSDAA.",
};

export default async function ProgramsPage() {
  let announcements: Announcement[] = placeholderAnnouncements;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_published", true)
      .order("is_pinned", { ascending: false })
      .order("date", { ascending: false });

    if (!error && data && data.length > 0) {
      announcements = data;
    }
  } catch {
    // Fall back to placeholder data
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            This Week
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Programs & Bulletin
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Stay informed about weekly worship, mid-week meetings, and important
            announcements.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Typical Weekly Schedule"
            description="Times may vary during special programs. Always check announcements."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: CalendarDays,
                day: "Friday",
                title: "Vespers",
                time: "6:00 PM – 7:30 PM",
                desc: "Welcome the Sabbath with song, prayer, and a short message.",
              },
              {
                icon: BookOpen,
                day: "Sabbath",
                title: "Worship Service",
                time: "9:00 AM – 1:00 PM",
                desc: "Sabbath School, Divine Service, and fellowship lunch when scheduled.",
              },
              {
                icon: Megaphone,
                day: "Mid-week",
                title: "Prayer & Study",
                time: "As announced",
                desc: "Bible study, prayer meetings, and ministry rehearsals.",
              },
            ].map((item) => (
              <div
                key={item.day}
                className="rounded-2xl border border-gray-100 p-6 bg-gray-50/50"
              >
                <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {item.day}
                </p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {item.time}
                </p>
                <p className="mt-3 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Announcements from Supabase */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Current Announcements
            </h2>
            {announcements.length === 0 ? (
              <p className="text-gray-500">No announcements at the moment.</p>
            ) : (
              <div className="space-y-4">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-gray-900">{a.title}</h3>
                      {a.is_pinned && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-600">{a.content}</p>
                    {a.date && (
                      <p className="mt-2 text-xs text-gray-400">
                        {format(parseISO(a.date), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

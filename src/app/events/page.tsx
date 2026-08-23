import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import { createClient } from "@/lib/supabase/server";
import { featuredEvents } from "@/data/placeholder";
import type { Event } from "@/types";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Stay up to date with MUSDAA worship services, youth programs, outreach, and special events at Makerere University.",
};

  export const dynamic = "force-static";

export default async function EventsPage() {
  let events: Event[] = featuredEvents;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: true });

    if (!error && data && data.length > 0) {
      events = data;
    }
  } catch {
    // Fall back to placeholder data
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Calendar
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Upcoming Events
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Join us for worship, fellowship, learning, and service throughout the
            semester.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What's Coming Up"
            description="Mark your calendar and invite a friend. All are welcome."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {events.length === 0 && (
            <p className="mt-12 text-center text-gray-500">
              No upcoming events at the moment. Check back soon!
            </p>
          )}

          <div className="mt-16 rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center">
            <h3 className="text-xl font-bold text-blue-900">
              Looking for the full calendar?
            </h3>
            <p className="mt-2 text-blue-800">
              Connect with us on social media or join the MUSDAA WhatsApp /
              Telegram groups for real-time updates and reminders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

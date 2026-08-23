import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Calendar, Pencil, Star } from "lucide-react";
import { format, parseISO } from "date-fns";
import DeleteEventButton from "@/components/admin/DeleteEventButton";

export const metadata = {
  title: "Events – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="mt-1 text-gray-600">
            Create and manage upcoming events and programs.
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Event
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load events. Ensure the <code className="bg-amber-100 px-1 rounded">events</code> table exists and RLS allows access.
        </div>
      )}

      {!error && (!events || events.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Calendar className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No events yet.</p>
          <Link
            href="/admin/events/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            <Plus className="h-4 w-4" /> Create your first event
          </Link>
        </div>
      )}

      {events && events.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {event.is_featured && (
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        {event.location && (
                          <p className="text-xs text-gray-500">{event.location}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {event.date
                      ? format(parseISO(event.date), "MMM d, yyyy")
                      : "—"}
                    {event.time && (
                      <span className="block text-xs text-gray-400">
                        {event.time}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        event.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteEventButton id={event.id} title={event.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

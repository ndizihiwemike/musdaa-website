import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Megaphone, Pencil, Pin } from "lucide-react";
import { format, parseISO } from "date-fns";
import DeleteAnnouncementButton from "@/components/admin/DeleteAnnouncementButton";

export const metadata = {
  title: "Announcements – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("announcements")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="mt-1 text-gray-600">Manage pinned and regular announcements.</p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus className="h-4 w-4" /> New Announcement
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load announcements.
        </div>
      )}

      {!error && (!items || items.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Megaphone className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No announcements yet.</p>
          <Link href="/admin/announcements/new" className="mt-4 inline-flex text-sm font-medium text-blue-700">
            Create first announcement
          </Link>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  {item.is_pinned && <Pin className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />}
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.content}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      {item.date ? format(parseISO(item.date), "MMM d, yyyy") : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${item.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                  <Link href={`/admin/announcements/${item.id}/edit`} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-blue-700 hover:bg-blue-50">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <DeleteAnnouncementButton id={item.id} title={item.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

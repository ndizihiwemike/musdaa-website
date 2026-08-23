import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Users, Pencil } from "lucide-react";
import DeleteMinistryButton from "@/components/admin/DeleteMinistryButton";

export const metadata = {
  title: "Ministries – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMinistriesPage() {
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("ministries")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ministries</h1>
          <p className="mt-1 text-gray-600">Manage ministries and projects.</p>
        </div>
        <Link
          href="/admin/ministries/new"
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          <Plus className="h-4 w-4" /> New Ministry
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load ministries.
        </div>
      )}

      {!error && (!items || items.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No ministries yet.</p>
          <Link href="/admin/ministries/new" className="mt-4 inline-flex text-sm font-medium text-blue-700">
            Create first ministry
          </Link>
        </div>
      )}

      {items && items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  {item.leader && <p className="text-sm text-gray-500">Leader: {item.leader}</p>}
                  {item.meeting_time && <p className="text-sm text-blue-600 mt-1">{item.meeting_time}</p>}
                  {item.description && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  )}
                </div>
                <span className={`shrink-0 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${item.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/admin/ministries/${item.id}/edit`} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-blue-700 hover:bg-blue-50">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <DeleteMinistryButton id={item.id} name={item.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Mic, Pencil } from "lucide-react";
import { format, parseISO } from "date-fns";
import DeleteSermonButton from "@/components/admin/DeleteSermonButton";

export const metadata = {
  title: "Sermons – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSermonsPage() {
  const supabase = await createClient();

  const { data: sermons, error } = await supabase
    .from("sermons")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sermons</h1>
          <p className="mt-1 text-gray-600">
            Manage sermon archive (video, audio, notes).
          </p>
        </div>
        <Link
          href="/admin/sermons/new"
          className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Sermon
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load sermons. Ensure the <code className="bg-amber-100 px-1 rounded">sermons</code> table exists.
        </div>
      )}

      {!error && (!sermons || sermons.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Mic className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No sermons yet.</p>
          <Link
            href="/admin/sermons/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            <Plus className="h-4 w-4" /> Add first sermon
          </Link>
        </div>
      )}

      {sermons && sermons.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sermon
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Speaker
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
              {sermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{sermon.title}</p>
                    {sermon.series && (
                      <p className="text-xs text-blue-600">{sermon.series}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {sermon.speaker}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {sermon.date
                      ? format(parseISO(sermon.date), "MMM d, yyyy")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        sermon.is_published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {sermon.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/sermons/${sermon.id}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-blue-700 hover:bg-blue-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                      <DeleteSermonButton id={sermon.id} title={sermon.title} />
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

import { createClient } from "@/lib/supabase/server";
import { Heart } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Prayer Requests – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPrayerRequestsPage() {
  const supabase = await createClient();

  const { data: requests, error } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Prayer Requests</h1>
        <p className="mt-1 text-gray-600">
          View and manage submitted prayer requests.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load prayer requests. Make sure the{" "}
          <code className="bg-amber-100 px-1 rounded">prayer_requests</code>{" "}
          table exists and RLS policies allow access.
        </div>
      )}

      {!error && (!requests || requests.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No prayer requests yet.</p>
        </div>
      )}

      {requests && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {req.is_anonymous
                      ? "Anonymous"
                      : req.name || "Unnamed"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {req.created_at
                      ? format(new Date(req.created_at), "PPp")
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      req.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : req.status === "prayed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {req.status}
                  </span>
                  {req.is_public && (
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                      Public
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {req.request}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

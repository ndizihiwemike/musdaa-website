import { createClient } from "@/lib/supabase/server";
import { Mail, MailOpen } from "lucide-react";
import { format } from "date-fns";
import MarkAsReadButton from "@/components/admin/MarkAsReadButton";

export const metadata = {
  title: "Contact Messages – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const unreadCount = messages?.filter((m) => !m.is_read).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="mt-1 text-gray-600">
          Messages submitted via the contact form.
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          Could not load messages. Ensure the contact_messages table exists.
        </div>
      )}

      {!error && (!messages || messages.length === 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Mail className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-4 text-gray-500">No messages yet.</p>
        </div>
      )}

      {messages && messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl border p-5 ${
                msg.is_read
                  ? "border-gray-200 bg-white"
                  : "border-blue-200 bg-blue-50/50"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {msg.is_read ? (
                    <MailOpen className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  ) : (
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{msg.name}</p>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-blue-700 hover:underline"
                    >
                      {msg.email}
                    </a>
                    {msg.subject && (
                      <p className="mt-1 text-sm font-medium text-gray-700">
                        Subject: {msg.subject}
                      </p>
                    )}
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {msg.created_at
                        ? format(new Date(msg.created_at), "PPp")
                        : ""}
                    </p>
                  </div>
                </div>
                {!msg.is_read && <MarkAsReadButton id={msg.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

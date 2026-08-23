import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Event – Admin",
  robots: { index: false, follow: false },
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        <p className="mt-1 text-gray-600">Update this event or program.</p>
      </div>
      <EventForm event={event} mode="edit" />
    </div>
  );
}

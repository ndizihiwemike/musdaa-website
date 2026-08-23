import EventForm from "@/components/admin/EventForm";

export const metadata = {
  title: "New Event – Admin",
  robots: { index: false, follow: false },
};

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Event</h1>
        <p className="mt-1 text-gray-600">Create a new event or program.</p>
      </div>
      <EventForm mode="create" />
    </div>
  );
}

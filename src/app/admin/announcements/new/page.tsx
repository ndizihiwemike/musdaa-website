import AnnouncementForm from "@/components/admin/AnnouncementForm";

export const metadata = {
  title: "New Announcement – Admin",
  robots: { index: false, follow: false },
};

export default function NewAnnouncementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Announcement</h1>
        <p className="mt-1 text-gray-600">Create a new announcement for the website.</p>
      </div>
      <AnnouncementForm mode="create" />
    </div>
  );
}

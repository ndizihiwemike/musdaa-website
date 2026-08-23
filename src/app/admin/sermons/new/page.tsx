import SermonForm from "@/components/admin/SermonForm";

export const metadata = {
  title: "New Sermon – Admin",
  robots: { index: false, follow: false },
};

export default function NewSermonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Sermon</h1>
        <p className="mt-1 text-gray-600">Add a sermon to the archive.</p>
      </div>
      <SermonForm mode="create" />
    </div>
  );
}

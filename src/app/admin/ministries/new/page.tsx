import MinistryForm from "@/components/admin/MinistryForm";

export const metadata = {
  title: "New Ministry – Admin",
  robots: { index: false, follow: false },
};

export default function NewMinistryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Ministry</h1>
        <p className="mt-1 text-gray-600">Add a new ministry or project.</p>
      </div>
      <MinistryForm mode="create" />
    </div>
  );
}

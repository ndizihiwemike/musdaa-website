import { notFound } from "next/navigation";
import MinistryForm from "@/components/admin/MinistryForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Ministry – Admin",
  robots: { index: false, follow: false },
};

export default async function EditMinistryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: ministry, error } = await supabase
    .from("ministries")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !ministry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Ministry</h1>
        <p className="mt-1 text-gray-600">Update this ministry or project.</p>
      </div>
      <MinistryForm ministry={ministry} mode="edit" />
    </div>
  );
}

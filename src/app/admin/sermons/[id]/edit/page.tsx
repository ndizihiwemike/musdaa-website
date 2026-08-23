import { notFound } from "next/navigation";
import SermonForm from "@/components/admin/SermonForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Sermon – Admin",
  robots: { index: false, follow: false },
};

export default async function EditSermonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: sermon, error } = await supabase
    .from("sermons")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !sermon) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Sermon</h1>
        <p className="mt-1 text-gray-600">Update this sermon in the archive.</p>
      </div>
      <SermonForm sermon={sermon} mode="edit" />
    </div>
  );
}

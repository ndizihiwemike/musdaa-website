import { notFound } from "next/navigation";
import AnnouncementForm from "@/components/admin/AnnouncementForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Announcement – Admin",
  robots: { index: false, follow: false },
};

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !announcement) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Announcement</h1>
        <p className="mt-1 text-gray-600">Update this announcement.</p>
      </div>
      <AnnouncementForm announcement={announcement} mode="edit" />
    </div>
  );
}

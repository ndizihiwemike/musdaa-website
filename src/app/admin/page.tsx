import { createClient } from "@/lib/supabase/server";
import {
  Calendar,
  Mic,
  Heart,
  Megaphone,
  Image,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts (will be 0 until tables have data / RLS allows)
  const [
    { count: eventsCount },
    { count: sermonsCount },
    { count: prayerCount },
    { count: announcementsCount },
  ] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("sermons").select("*", { count: "exact", head: true }),
    supabase
      .from("prayer_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("announcements")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
  ]);

  const stats = [
    {
      label: "Events",
      value: eventsCount ?? 0,
      icon: Calendar,
      href: "/admin/events",
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Sermons",
      value: sermonsCount ?? 0,
      icon: Mic,
      href: "/admin/sermons",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Pending Prayers",
      value: prayerCount ?? 0,
      icon: Heart,
      href: "/admin/prayer-requests",
      color: "bg-rose-100 text-rose-700",
    },
    {
      label: "Announcements",
      value: announcementsCount ?? 0,
      icon: Megaphone,
      href: "/admin/announcements",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const quickLinks = [
    { href: "/admin/events", label: "Manage Events", icon: Calendar },
    { href: "/admin/sermons", label: "Manage Sermons", icon: Mic },
    { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { href: "/admin/gallery", label: "Gallery", icon: Image },
    { href: "/admin/prayer-requests", label: "Prayer Requests", icon: Heart },
    { href: "/admin/ministries", label: "Ministries", icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back. Here&apos;s an overview of MUSDAA content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <link.icon className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">{link.label}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Help note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900">
        <p className="font-medium">Getting started</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-blue-800">
          <li>
            Run the SQL schema in{" "}
            <code className="bg-blue-100 px-1 rounded">supabase/schema.sql</code>{" "}
            inside your Supabase project.
          </li>
          <li>
            Create the first admin user in Supabase Auth, then update their{" "}
            <code className="bg-blue-100 px-1 rounded">role</code> in the{" "}
            <code className="bg-blue-100 px-1 rounded">profiles</code> table to{" "}
            <code className="bg-blue-100 px-1 rounded">admin</code> or{" "}
            <code className="bg-blue-100 px-1 rounded">super_admin</code>.
          </li>
          <li>
            Content management pages (Events, Sermons, etc.) are scaffolded and
            ready for CRUD implementation.
          </li>
        </ul>
      </div>
    </div>
  );
}

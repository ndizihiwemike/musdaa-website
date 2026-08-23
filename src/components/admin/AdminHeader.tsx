"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Mic,
  Megaphone,
  Image,
  Heart,
  Users,
  Mail,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/sermons", label: "Sermons", icon: Mic },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/prayer-requests", label: "Prayer Requests", icon: Heart },
  { href: "/admin/ministries", label: "Ministries", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminHeaderProps {
  userEmail: string;
}

export default function AdminHeader({ userEmail }: AdminHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden lg:block text-sm text-gray-500">
          Content Management
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:inline">
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Sign out
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-blue-950 text-blue-100 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-blue-900">
              <span className="font-bold text-white">MUSDAA Admin</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded text-blue-200 hover:bg-blue-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-blue-800 text-white"
                        : "text-blue-200 hover:bg-blue-900"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-blue-900">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-200 hover:bg-blue-900"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

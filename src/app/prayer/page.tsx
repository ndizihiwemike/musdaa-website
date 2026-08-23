import type { Metadata } from "next";
import PrayerForm from "@/components/PrayerForm";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Share your prayer requests with the MUSDAA family. We are privileged to stand with you in prayer.",
};

export default function PrayerPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            We Pray With You
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Prayer Requests
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            &ldquo;Pray without ceasing.&rdquo; — 1 Thessalonians 5:17. Share
            your burdens and rejoicings. Our prayer team is ready to intercede.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <PrayerForm />

          <div className="mt-10 text-center text-gray-600">
            <p className="text-sm">
              You can also share prayer needs privately with any of the MUSDAA
              leaders or the chaplain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

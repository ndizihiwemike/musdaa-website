import type { Metadata } from "next";
import { Heart, HandHeart, Church } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate & Support",
  description:
    "Partner with MUSDAA through your generous giving to support ministries, outreach, and campus mission.",
};

export default function DonatePage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Partner With Us
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Donate & Support Ministries
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Your generosity enables worship, outreach, discipleship, and care
            for students at Makerere University.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Church,
                title: "Worship & Programs",
                text: "Support weekly services, special programs, and guest speakers.",
              },
              {
                icon: HandHeart,
                title: "Outreach & Mission",
                text: "Fund community projects, health fairs, and evangelistic efforts.",
              },
              {
                icon: Heart,
                title: "Student Care",
                text: "Help students in need and support discipleship resources.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 p-6 text-center"
              >
                <div className="mx-auto inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-blue-50 p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold text-blue-900">
              How to Give
            </h2>
            <p className="mt-3 text-blue-800">
              Mobile money and bank transfer details will be published here.
              For now, please contact the treasurer or any leader for giving
              information.
            </p>
            <div className="mt-8 space-y-3 text-left bg-white rounded-xl p-6 border border-blue-100">
              <p className="text-sm">
                <span className="font-semibold text-gray-900">Mobile Money:</span>{" "}
                <span className="text-gray-600">0766530153 and MERCHANT CODE- 723336</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-900">Bank Transfer:</span>{" "}
                <span className="text-gray-600">Coming soon</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold text-gray-900">Contact:</span>{" "}
                <span className="text-gray-600">treasurer@musdaa.org</span>
              </p>
            </div>
            <p className="mt-6 text-xs text-blue-700">
              All gifts are used strictly for ministry purposes under the
              oversight of MUSDAA leadership.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

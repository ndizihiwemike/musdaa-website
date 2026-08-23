import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { Heart, Target, Eye, History } from "lucide-react";

export const metadata: Metadata = {
  title: "About MUSDAA",
  description:
    "Learn about the mission, vision, history, and leadership of the Makerere University Seventh-day Adventist Association.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            About Us
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            About MUSDAA
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            A vibrant public campus ministry serving students, staff, and the
            wider community of Makerere University.
          </p>
        </div>
      </div>

      {/* Mission / Vision / Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-gray-100 p-8 bg-gray-50/50">
              <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Mission</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                To nurture spiritual growth, promote Christian fellowship, and
                engage in mission and service among the Makerere University
                community and beyond.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-8 bg-gray-50/50">
              <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Vision</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                A thriving community of faith where every student and staff
                member encounters Jesus Christ and is equipped for lifelong
                discipleship and service.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-8 bg-gray-50/50">
              <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                <Heart className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">Values</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Faithfulness to Scripture, Christ-centered worship, genuine
                fellowship, compassionate service, and excellence in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700 mb-4">
                <History className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our History</h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Makerere University Seventh-day Adventist Association
                  (MUSDAA) has been a beacon of faith on campus for many years,
                  providing a spiritual home for Adventist students and friends
                  from diverse backgrounds.
                </p>
                <p>
                  Through changing academic seasons and generations of students,
                  MUSDAA has remained committed to the mission of the Seventh-day
                  Adventist Church while meeting the unique needs of university
                  life.
                </p>
                <p>
                  Today, MUSDAA continues to grow as a vibrant community of
                  worship, learning, fellowship, and outreach — fully owned and
                  driven by its members.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-8 sm:p-10 text-white">
              <h3 className="text-xl font-bold">Pastor&apos;s Message</h3>
              <blockquote className="mt-4 text-blue-100 leading-relaxed italic">
                &ldquo;It is a joy to serve alongside the young people of MUSDAA.
                In a season of life filled with questions and pressures, this
                association offers a place to encounter Jesus, grow in community,
                and discover purpose. You are welcome here.&rdquo;
              </blockquote>
              <p className="mt-6 font-semibold">— Pastor [Name], MUSDAA Chaplain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership placeholder */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Leadership"
            description="MUSDAA is led by dedicated student officers, mentors, and a chaplain who work together to shepherd the association."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {["President", "Vice President", "Secretary", "Treasurer"].map(
              (role) => (
                <div
                  key={role}
                  className="text-center rounded-2xl border border-gray-100 p-6"
                >
                  <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                    {role[0]}
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{role}</h3>
                  <p className="text-sm text-gray-500 mt-1">To be updated</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

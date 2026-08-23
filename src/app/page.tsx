import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Users, Calendar } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import SermonCard from "@/components/SermonCard";
import {
  featuredEvents,
  recentSermons,
  announcements,
} from "@/data/placeholder";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Welcome / Mission strip */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who We Are"
            title="A Home Away From Home"
            description="MUSDAA exists to nurture spiritual growth, promote Christian fellowship, and engage in mission and service among students, staff, and the wider Makerere community."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Spiritual Growth",
                text: "Weekly worship, Bible study, and discipleship opportunities.",
              },
              {
                icon: Users,
                title: "Fellowship",
                text: "A warm community where every student finds belonging.",
              },
              {
                icon: Heart,
                title: "Mission & Service",
                text: "Outreach, health fairs, and practical love in action.",
              },
              {
                icon: Calendar,
                title: "Vibrant Programs",
                text: "Youth weeks, seminars, music, and special events all year.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 hover:border-blue-100 hover:bg-blue-50/30 transition-colors"
              >
                <div className="inline-flex rounded-xl bg-blue-100 p-3 text-blue-700">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <section className="bg-amber-50 border-y border-amber-100 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-amber-900">
                Latest Announcements
              </h2>
              <Link
                href="/programs"
                className="text-sm font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl bg-white border border-amber-100 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    {a.is_pinned && (
                      <span className="shrink-0 rounded-full bg-amber-200 px-2 py-0.5 text-xs font-medium text-amber-900">
                        Pinned
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="What's On"
              title="Upcoming Events"
              align="left"
            />
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              All events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Grow in the Word"
              title="Recent Sermons"
              align="left"
            />
            <Link
              href="/sermons"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Sermon archive <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSermons.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-blue-900 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            New to Makerere? Welcome Home.
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Whether you are a new student, visitor, or long-time member, there
            is a place for you at MUSDAA. Come and experience fellowship,
            purpose, and spiritual growth.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-semibold text-blue-900 hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/prayer"
              className="inline-flex items-center rounded-full bg-white/10 px-6 py-3 text-base font-semibold text-white ring-1 ring-white/30 hover:bg-white/20 transition-colors"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

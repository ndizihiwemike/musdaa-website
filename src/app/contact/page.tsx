import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Get in touch with MUSDAA or find us at Makerere University, Kampala.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
            Reach Out
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">
            Contact & Location
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            We would love to hear from you. Whether you are a new student,
            visitor, or partner, get in touch.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Get in Touch
              </h2>
              <p className="mt-3 text-gray-600">
                Prefer to message us directly? Use the form or the contact
                details below.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600">
                      Makerere University Main Campus
                      <br />
                      Kampala, Uganda
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href="mailto:info@musdaa.org"
                      className="text-blue-700 hover:underline"
                    >
                      info@musdaa.org
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">+256 XXX XXX XXX</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 rounded-xl bg-blue-100 p-3 text-blue-700">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Service Times</p>
                    <p className="text-gray-600">
                      Friday Vespers · 6:00 PM
                      <br />
                      Sabbath Worship · 9:00 AM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

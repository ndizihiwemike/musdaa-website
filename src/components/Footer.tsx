import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/image.png";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="MUSDAA" className="h-16 w-auto rounded bg-white p-1" />
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              Makerere University Seventh-day Adventist Association — nurturing
              spiritual growth, Christian fellowship, and mission among students
              and the wider community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About MUSDAA
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Programs & Bulletin
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-white transition-colors">
                  Sermons & Livestream
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="hover:text-white transition-colors">
                  Ministries
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prayer" className="hover:text-white transition-colors">
                  Prayer Requests
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-white transition-colors">
                  Donate & Support
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-300" />
                <span>Makerere University, Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-blue-300" />
                <a href="mailto:info@musdaa.org" className="hover:text-white">
                  info@musdaa.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-blue-300" />
                <span>+256 XXX XXX XXX</span>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-300">
          <p>© {new Date().getFullYear()} MUSDAA. All rights reserved.</p>
          <p>
            Built with love by NDIZIHIWE MIKE.
          </p>
        </div>
      </div>
    </footer>
  );
}

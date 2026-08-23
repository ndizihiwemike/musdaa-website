import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Event } from "@/types";
import { format, parseISO } from "date-fns";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = event.date
    ? format(parseISO(event.date), "EEE, MMM d, yyyy")
    : "TBA";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[16/9] bg-gradient-to-br from-blue-600 to-blue-800 relative">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Calendar className="h-16 w-16 text-blue-200/60" />
          </div>
        )}
        {event.is_featured && (
          <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
          {event.title}
        </h3>

        <div className="mt-3 space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600 shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="mt-3 text-sm text-gray-500 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={`/events#${event.id}`}
            className="inline-flex text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
}

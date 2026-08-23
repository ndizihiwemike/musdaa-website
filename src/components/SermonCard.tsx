import Link from "next/link";
import { Play, Headphones, FileText, User, Calendar } from "lucide-react";
import type { Sermon } from "@/types";
import { format, parseISO } from "date-fns";

interface SermonCardProps {
  sermon: Sermon;
}

export default function SermonCard({ sermon }: SermonCardProps) {
  const formattedDate = sermon.date
    ? format(parseISO(sermon.date), "MMM d, yyyy")
    : "";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-900 relative">
        {sermon.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sermon.thumbnail_url}
            alt={sermon.title}
            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play className="h-14 w-14 text-white/50" />
          </div>
        )}
        {sermon.video_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-white/90 p-3">
              <Play className="h-6 w-6 text-blue-700 fill-blue-700" />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {sermon.series && (
          <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
            {sermon.series}
          </span>
        )}
        <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
          {sermon.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {sermon.speaker}
          </span>
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          )}
        </div>

        {sermon.description && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {sermon.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3">
          {sermon.video_url && (
            <Link
              href={sermon.video_url}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <Play className="h-4 w-4" /> Watch
            </Link>
          )}
          {sermon.audio_url && (
            <Link
              href={sermon.audio_url}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <Headphones className="h-4 w-4" /> Listen
            </Link>
          )}
          {sermon.document_url && (
            <Link
              href={sermon.document_url}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <FileText className="h-4 w-4" /> Notes
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

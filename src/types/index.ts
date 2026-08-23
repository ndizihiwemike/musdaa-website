export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description?: string;
  video_url?: string;
  audio_url?: string;
  document_url?: string;
  thumbnail_url?: string;
  series?: string;
  created_at?: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  leader?: string;
  image_url?: string;
  meeting_time?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  is_pinned?: boolean;
}

export interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  is_anonymous: boolean;
  is_public: boolean;
  status: "pending" | "prayed" | "answered";
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  event_date?: string;
}

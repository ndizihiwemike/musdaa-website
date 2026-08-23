import type { Event, Sermon, Ministry, Announcement } from "@/types";

export const featuredEvents: Event[] = [
  {
    id: "1",
    title: "Weekly Sabbath Worship Service",
    description:
      "Join us every Sabbath for inspiring worship, powerful preaching from the Word, and warm Christian fellowship. All students and visitors are welcome.",
    date: "2026-08-22",
    time: "9:00 AM – 1:00 PM",
    location: "MUSDAA Hall, Makerere University",
    is_featured: true,
  },
  {
    id: "2",
    title: "Youth Week of Prayer",
    description:
      "A special week dedicated to spiritual revival among students. Daily evening meetings with powerful messages, prayer, and testimonies.",
    date: "2026-09-05",
    time: "6:00 PM – 8:00 PM",
    location: "Main Campus Chapel",
    is_featured: true,
  },
  {
    id: "3",
    title: "Community Outreach & Health Fair",
    description:
      "Serving our neighbours through free health screening, counselling, literature, and practical help. Come and be a blessing.",
    date: "2026-09-20",
    time: "8:00 AM – 4:00 PM",
    location: "Katanga Community",
  },
  {
    id: "4",
    title: "New Students Welcome Sabbath",
    description:
      "A special service to welcome all new and returning students. Connect, belong, and start the semester with Christ.",
    date: "2026-08-29",
    time: "9:00 AM – 1:30 PM",
    location: "MUSDAA Hall",
    is_featured: true,
  },
];

export const recentSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking by Faith in Uncertain Times",
    speaker: "Pastor John Okello",
    date: "2026-08-15",
    description:
      "A powerful message on trusting God when the path ahead is unclear and the pressures of university life feel overwhelming.",
    series: "Faith Series",
    video_url: "#",
  },
  {
    id: "2",
    title: "The Power of a Praying Student",
    speaker: "Elder Sarah Namuli",
    date: "2026-08-08",
    description:
      "Practical lessons on building a consistent prayer life amidst lectures, deadlines, and campus pressures.",
    series: "Campus Life",
    audio_url: "#",
  },
  {
    id: "3",
    title: "Called to Serve: Finding Your Ministry",
    speaker: "Pastor David Kato",
    date: "2026-08-01",
    description:
      "Discovering how God has uniquely gifted you for service in His kingdom — right here on campus and beyond.",
    series: "Discipleship",
    video_url: "#",
    document_url: "#",
  },
  {
    id: "4",
    title: "The Sabbath: A Gift for Weary Students",
    speaker: "Pastor John Okello",
    date: "2026-07-25",
    description:
      "Rediscovering the beauty and rest of the Sabbath in a culture of constant busyness and academic pressure.",
    series: "Sabbath Truth",
    video_url: "#",
    audio_url: "#",
  },
];

export const ministries: Ministry[] = [
  {
    id: "1",
    name: "Youth Ministry",
    description:
      "Empowering young people to grow in faith, leadership, and service through dynamic programs, mentorship, and peer support.",
    meeting_time: "Sabbaths after service",
  },
  {
    id: "2",
    name: "Music & Choir",
    description:
      "Leading the congregation in spirit-filled worship through vocal and instrumental music that glorifies God.",
    meeting_time: "Friday evenings & Sabbath mornings",
  },
  {
    id: "3",
    name: "Outreach & Evangelism",
    description:
      "Sharing the everlasting gospel through literature, personal witnessing, community projects, and campus outreach.",
    meeting_time: "Sundays & mid-week",
  },
  {
    id: "4",
    name: "Health & Temperance",
    description:
      "Promoting healthy living and the Adventist health message through education, cooking demos, and practical programs.",
    meeting_time: "Bi-weekly",
  },
  {
    id: "5",
    name: "Women's Ministries",
    description:
      "Supporting and empowering women in their spiritual journey, families, academic life, and professional calling.",
    meeting_time: "Monthly",
  },
  {
    id: "6",
    name: "Prayer Ministry",
    description:
      "Interceding for the campus, the church, the nation, and the world through organised prayer chains and special seasons.",
    meeting_time: "Daily & special seasons",
  },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Academic Year Welcome Service",
    content:
      "All new and returning students are warmly invited to our special Welcome Sabbath on 29th August. Come and connect with the MUSDAA family!",
    date: "2026-08-18",
    is_pinned: true,
  },
  {
    id: "2",
    title: "Choir Recruitment Open",
    content:
      "Do you love singing for the Lord? The MUSDAA Choir is looking for new members. Auditions this Friday after vespers. All voice parts needed.",
    date: "2026-08-17",
  },
  {
    id: "3",
    title: "Prayer Chain – Join Us",
    content:
      "The Prayer Ministry is organising a 24-hour prayer chain for the new semester. Sign up with any prayer leader or at the information desk.",
    date: "2026-08-16",
  },
];

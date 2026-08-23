-- ============================================================
-- MUSDAA Seed Data
-- Run AFTER schema.sql
-- Safe to re-run (uses ON CONFLICT / simple inserts)
-- ============================================================

-- ---------- ANNOUNCEMENTS ----------
INSERT INTO public.announcements (title, content, date, is_pinned, is_published)
VALUES
  (
    'New Academic Year Welcome Service',
    'All new and returning students are warmly invited to our special Welcome Sabbath on 29th August. Come and connect with the MUSDAA family!',
    '2026-08-18',
    true,
    true
  ),
  (
    'Choir Recruitment Open',
    'Do you love singing for the Lord? The MUSDAA Choir is looking for new members. Auditions this Friday after vespers. All voice parts needed.',
    '2026-08-17',
    false,
    true
  ),
  (
    'Prayer Chain – Join Us',
    'The Prayer Ministry is organising a 24-hour prayer chain for the new semester. Sign up with any prayer leader or at the information desk.',
    '2026-08-16',
    false,
    true
  );

-- ---------- EVENTS ----------
INSERT INTO public.events (title, description, date, time, location, is_featured, is_published)
VALUES
  (
    'Weekly Sabbath Worship Service',
    'Join us every Sabbath for inspiring worship, powerful preaching from the Word, and warm Christian fellowship. All students and visitors are welcome.',
    '2026-08-22',
    '9:00 AM – 1:00 PM',
    'MUSDAA Hall, Makerere University',
    true,
    true
  ),
  (
    'Youth Week of Prayer',
    'A special week dedicated to spiritual revival among students. Daily evening meetings with powerful messages, prayer, and testimonies.',
    '2026-09-05',
    '6:00 PM – 8:00 PM',
    'Main Campus Chapel',
    true,
    true
  ),
  (
    'Community Outreach & Health Fair',
    'Serving our neighbours through free health screening, counselling, literature, and practical help. Come and be a blessing.',
    '2026-09-20',
    '8:00 AM – 4:00 PM',
    'Katanga Community',
    false,
    true
  ),
  (
    'New Students Welcome Sabbath',
    'A special service to welcome all new and returning students. Connect, belong, and start the semester with Christ.',
    '2026-08-29',
    '9:00 AM – 1:30 PM',
    'MUSDAA Hall',
    true,
    true
  );

-- ---------- SERMONS ----------
INSERT INTO public.sermons (title, speaker, date, description, series, video_url, audio_url, document_url, is_published)
VALUES
  (
    'Walking by Faith in Uncertain Times',
    'Pastor John Okello',
    '2026-08-15',
    'A powerful message on trusting God when the path ahead is unclear and the pressures of university life feel overwhelming.',
    'Faith Series',
    NULL,
    NULL,
    NULL,
    true
  ),
  (
    'The Power of a Praying Student',
    'Elder Sarah Namuli',
    '2026-08-08',
    'Practical lessons on building a consistent prayer life amidst lectures, deadlines, and campus pressures.',
    'Campus Life',
    NULL,
    NULL,
    NULL,
    true
  ),
  (
    'Called to Serve: Finding Your Ministry',
    'Pastor David Kato',
    '2026-08-01',
    'Discovering how God has uniquely gifted you for service in His kingdom — right here on campus and beyond.',
    'Discipleship',
    NULL,
    NULL,
    NULL,
    true
  ),
  (
    'The Sabbath: A Gift for Weary Students',
    'Pastor John Okello',
    '2026-07-25',
    'Rediscovering the beauty and rest of the Sabbath in a culture of constant busyness and academic pressure.',
    'Sabbath Truth',
    NULL,
    NULL,
    NULL,
    true
  );

-- ---------- MINISTRIES ----------
INSERT INTO public.ministries (name, description, meeting_time, is_active, sort_order)
VALUES
  (
    'Youth Ministry',
    'Empowering young people to grow in faith, leadership, and service through dynamic programs, mentorship, and peer support.',
    'Sabbaths after service',
    true,
    1
  ),
  (
    'Music & Choir',
    'Leading the congregation in spirit-filled worship through vocal and instrumental music that glorifies God.',
    'Friday evenings & Sabbath mornings',
    true,
    2
  ),
  (
    'Outreach & Evangelism',
    'Sharing the everlasting gospel through literature, personal witnessing, community projects, and campus outreach.',
    'Sundays & mid-week',
    true,
    3
  ),
  (
    'Health & Temperance',
    'Promoting healthy living and the Adventist health message through education, cooking demos, and practical programs.',
    'Bi-weekly',
    true,
    4
  ),
  (
    'Women''s Ministries',
    'Supporting and empowering women in their spiritual journey, families, academic life, and professional calling.',
    'Monthly',
    true,
    5
  ),
  (
    'Prayer Ministry',
    'Interceding for the campus, the church, the nation, and the world through organised prayer chains and special seasons.',
    'Daily & special seasons',
    true,
    6
  );

-- ---------- SITE SETTINGS (already seeded in schema, but ensure defaults) ----------
INSERT INTO public.site_settings (key, value, label) VALUES
  ('site_name', 'MUSDAA', 'Site Name'),
  ('site_tagline', 'Makerere University Seventh-day Adventist Association', 'Tagline'),
  ('contact_email', 'info@musdaa.org', 'Contact Email'),
  ('contact_phone', '+256 XXX XXX XXX', 'Contact Phone'),
  ('location', 'Makerere University Main Campus, Kampala, Uganda', 'Location'),
  ('facebook_url', '', 'Facebook URL'),
  ('instagram_url', '', 'Instagram URL'),
  ('youtube_url', '', 'YouTube URL')
ON CONFLICT (key) DO NOTHING;

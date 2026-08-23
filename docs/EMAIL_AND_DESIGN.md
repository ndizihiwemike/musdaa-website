# Email Notifications & Design Notes

## Email Notifications (Prayer Requests & Contact Messages)

Supabase does **not** send emails by default when a row is inserted.  
Recommended approaches (pick one):

### Option A – Supabase Edge Function + Resend / SendGrid (recommended)

1. Create a free account at [resend.com](https://resend.com) or SendGrid.
2. Create a Supabase Edge Function (`supabase functions new notify-prayer`).
3. On `INSERT` to `prayer_requests` or `contact_messages`, call the function via a Database Webhook.
4. The function sends an email to the prayer team / admin email list.

Example webhook trigger (SQL):

```sql
-- After enabling Database Webhooks in Supabase Dashboard
-- Point the webhook to your Edge Function URL
```

### Option B – Make.com / Zapier / n8n

- Watch the `prayer_requests` and `contact_messages` tables (or use Supabase webhooks).
- Send email via Gmail, Outlook, or any SMTP provider.
- Very quick to set up with no code.

### Option C – Client-side (simple but less reliable)

After a successful form submission you can call a serverless API route that uses Resend/Nodemailer.  
Less ideal because the user could close the tab before the request finishes.

---

## Design / Colour Refinements

Current palette (intentionally clean & trustworthy):

| Token        | Value     | Usage                          |
|--------------|-----------|--------------------------------|
| Primary      | `#1d4ed8` (blue-700) | Buttons, links, accents     |
| Primary dark | `#1e3a8a` (blue-900) | Hero, footer, admin sidebar |
| Accent       | `#f59e0b` (amber)    | Featured badges, highlights |
| Neutral      | slate/gray scale     | Body text, borders          |

### Easy customisations

1. **Change primary colour**  
   Search-and-replace `blue-700`, `blue-800`, `blue-900`, `blue-950` in components, or introduce CSS variables in `globals.css`.

2. **Add Adventist branding**  
   - Upload the official MUSDAA / SDA logo to `/public/logo.svg`  
   - Replace the `<Church />` icon in `Navbar.tsx` and `Footer.tsx` with an `<Image>`.

3. **Dark mode**  
   The current design is light-only. Tailwind dark-mode classes can be added later if desired.

4. **Typography**  
   Currently using Geist (Next.js default). You can switch to any Google Font in `layout.tsx`.

---

## Suggested next polish items

- [ ] Official logo in navbar & footer
- [ ] Favicon with MUSDAA / SDA symbol
- [ ] Open Graph images for social sharing
- [ ] Loading skeletons on public Events / Sermons pages
- [ ] Pagination on admin lists when data grows
EOF

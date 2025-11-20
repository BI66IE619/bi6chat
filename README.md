# Student Chat Platform (Vercel + MongoDB + Scaledrone)
This repository implements a school-safe, moderated student chat platform with signup approval flow, roles, admin dashboard, and Scaledrone real-time publishing.

## Quick features
- Signup with `pending` status; admins approve accounts
- Roles: `user`, `moderator`, `admin`
- Moderation: keyword list + server-side audit logs
- Temporary mute/unmute, ban/unban
- Chat messages stored in MongoDB; server publishes to Scaledrone REST API

## Files & Structure
See the `public/`, `api/`, `lib/` and `config/` folders for frontend, serverless routes, and helpers.

## Env vars (Vercel)
- MONGO_URL — MongoDB Atlas connection string
- JWT_SECRET — secret for signing tokens
- SCALED_RONE_CHANNEL_ID — client-side channel id
- SCALED_RONE_API_KEY — server-side REST API key (keep secret)
- ADMIN_DEFAULT_PASSWORD — optional seed

## Deploy to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables as described above in Project Settings.
4. Deploy.

## Database Schemas (Mongoose)
- User (see lib/db.js)
- ChatMessage (see lib/db.js)
- AuditLog (see lib/db.js)

## Moderation
- Add/remove keywords in `config/moderationKeywords.json`
- Server blocks messages containing keywords, saves `[removed]`, and logs to `AuditLog`.

## Replacements for deployers
Replace `MONGO_URL`, `JWT_SECRET`, `SCALED_RONE_CHANNEL_ID`, `SCALED_RONE_API_KEY` in Vercel environment variables.

## Notes & Next steps
- This starter implementation focuses on correctness and security basics; consider adding CSRF protection, rate limiting, production logging, tests, and stronger session handling for production.

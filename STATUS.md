# Wenia Sponsor Dashboard — Status

**Last updated:** March 21, 2026
**Repo:** `10amalpha/wenia-dashboard`
**Live:** https://wenia-dashboard.vercel.app
**File to edit:** `app/Dashboard.jsx` → `EPISODES` array

---

## Sponsor Info

- **Sponsor:** Wenia
- **Total investment:** $4,000
- **Sponsored episodes:** E190, E191, E196, E198, E199, E200

---

## Current Episode Stats (as of Mar 21, 2026)

| Ep | Date | videoId | Spotify | X | Substack |
|---|---|---|---|---|---|
| E190 | 2026-01-22 | yIPNyvVyApk | 6,874 | 2,692 | 4,440 |
| E191 | 2026-01-29 | PdTGv5Z71SE | 6,163 | 1,667 | 3,480 |
| E196 | 2026-02-26 | 5QWEatCbScI | 3,165 | 1,438 | 3,090 |
| E198 | 2026-03-05 | leDK2mccGWM | 5,660 | 2,987 | 3,160 |
| E199 | 2026-03-12 | aVXkfdDOQJw | 2,696 | 1,250 | 2,740 |
| E200 | 2026-03-19 | QbS-TGwMuw0 | 1,477 | 1,247 | 2,460 |

**YouTube views** are fetched live via API — not stored here.

---

## Data Sources

| Platform | Type | How to get |
|---|---|---|
| YouTube | **Auto (API)** | Live via `googleapis.com/youtube/v3/videos`. API key in code. No action needed. |
| Spotify | **Manual** | Go to `creators.spotify.com/pod/show/5zdwe972gB7eJ2lGIEeJjD/episodes`. Use the **second column** (Spotify plays), NOT the first (Streams & downloads). |
| Apple Podcasts | **Auto (estimated)** | Calculated as `Spotify × 0.45` in code. No action needed. |
| X (Twitter) | **Manual** | Navigate to each episode's `xUrl` and read the "Views" count from the post. |
| Substack | **Manual** | Go to `10am.pro/publish/posts/published`. Read "Views" (shown as e.g. "2.46k") for each episode. |

---

## Episode Links

### E200 — Irán 🇮🇷, petróleo 🛢, dólar 💵 y drones
- YouTube: https://youtu.be/QbS-TGwMuw0
- Spotify: https://open.spotify.com/episode/0onH7EcXY1NVP9jY9TbPDT
- Apple: https://podcasts.apple.com/us/podcast/e200-ir%C3%A1n-petr%C3%B3leo-d%C3%B3lar-y-drones-hern%C3%A1n-dar%C3%ADo-guillermo/id1661010704?i=1000756112388
- X: https://x.com/10ampro/status/2034612098651848950
- Substack: https://www.10am.pro/p/e200-iran-petroleo-dolar-y-drones

### E199 — Construyendo el Internet del futuro ⚡️ Double Zero
- YouTube: https://youtu.be/aVXkfdDOQJw
- Spotify: https://open.spotify.com/episode/4Nhf11HjBhKv8NUW30vNAK
- Apple: https://podcasts.apple.com/us/podcast/e199-construyendo-el-internet-del-futuro-double-zero/id1661010704?i=1000754822716
- X: https://x.com/10ampro/status/2032075383693091213
- Substack: https://www.10am.pro/p/e199-construyendo-el-internet-del

### E198 — 2028 🤯 El año que todos quedaremos sin trabajo
- YouTube: https://youtu.be/leDK2mccGWM
- Spotify: https://open.spotify.com/episode/2Cv4pSEiHw6GWt6IfBcCRb
- Apple: https://podcasts.apple.com/us/podcast/e198-2028-el-a%C3%B1o-que-todos-quedaremos-sin-trabajo/id1661010704?i=1000753189322
- X: https://x.com/10ampro/status/2029538669133283685
- Substack: https://www.10am.pro/p/e198-2028-el-ano-que-todos-quedaremos

### E196 — Colombia 🇨🇴 vs Argentina 🇦🇷. Modelo económico y batalla cultural.
- YouTube: https://youtu.be/5QWEatCbScI
- Spotify: https://open.spotify.com/episode/0vDtyoSUsQdMLfm9qGMOtt
- Apple: https://podcasts.apple.com/us/podcast/e196-colombia-vs-argentina-modelo-econ%C3%B3mico-y-batalla/id1661010704?i=1000751721814
- X: https://x.com/10ampro/status/2027001953679446069
- Substack: https://www.10am.pro/p/e196-colombia-vs-argentina-modelo

### E191 — Las 5 señales del cambio de era
- YouTube: https://youtu.be/PdTGv5Z71SE
- Spotify: https://open.spotify.com/episode/6aM1jKEPafXHAHlu5LlCez
- Apple: https://podcasts.apple.com/us/podcast/e191-las-5-se%C3%B1ales-del-cambio-de-era-hern%C3%A1n-dar%C3%ADo/id1661010704?i=1000747145276
- X: https://x.com/10ampro/status/2016853835294396623
- Substack: https://www.10am.pro/p/e191-las-5-senales-del-cambio-de

### E190 — Forecast 2026
- YouTube: https://youtu.be/yIPNyvVyApk
- Spotify: https://open.spotify.com/episode/2AuulJKgCSMJ6RfFkKWO4O
- Apple: https://podcasts.apple.com/cm/podcast/e190-forecast-2026-hern%C3%A1n-jaramillo-dar%C3%ADo-palacio-andr%C3%A9s/id1661010704?i=1000746183252
- X: https://x.com/10ampro/status/2014317120536875511
- Substack: https://www.10am.pro/p/e190-forecast-2026

---

## Channel Audience (hardcoded in Dashboard.jsx)

| Platform | Followers |
|---|---|
| YouTube | 23,700 |
| Spotify | 38,600 |
| Apple | 6,000 |
| TikTok | 48,800 |
| Instagram | 17,000 |

---

## Update Checklist

When adding a new episode or refreshing stats:

1. **Clone:** `git clone --depth=1 https://x-access-token:${PAT}@github.com/10amalpha/wenia-dashboard.git /tmp/wenia-dashboard`
2. **Collect new episode info:** videoId (from YouTube URL), title, date, all platform links
3. **Fetch Spotify:** `creators.spotify.com/pod/show/5zdwe972gB7eJ2lGIEeJjD/episodes` → 2nd column
4. **Fetch X:** Navigate to each `xUrl` → read Views
5. **Fetch Substack:** `10am.pro/publish/posts/published` → read Views per episode
6. **Edit** `app/Dashboard.jsx`:
   - Update ALL episodes' Spotify/X/Substack stats (they grow over time)
   - Add new episode entry to `EPISODES` array
   - Update `CHANNEL_AUDIENCE` numbers if changed
   - Update fallback date strings in footer (search for "última actualización")
7. **Build:** `npm install && npx next build`
8. **Deploy:** `git add -A && git commit -m "Add EXXX + update stats" && git push`
9. **Update this STATUS.md** with new stats

---

## Rules

- YouTube = API (never scrape, never hardcode views)
- Spotify = **second column** (Spotify plays), not first (Streams & downloads)
- Apple Podcasts = `Spotify × 0.45` (auto in code, never manual)
- Always update ALL episodes, not just the new one
- Update the fallback date in footer when refreshing stats
- Update `CHANNEL_AUDIENCE` if follower counts changed
- Real data only — if no data, use 0, never invent numbers
- `totalInvestment` stays at $4,000 unless Hernán says otherwise

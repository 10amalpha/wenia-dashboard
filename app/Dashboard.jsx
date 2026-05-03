"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// WENIA SPONSOR DASHBOARD — 10AMPRO
// YouTube = LIVE via API | Spotify = manual | Apple = estimated
// ═══════════════════════════════════════════════════════════════

const YT_API_KEY = "AIzaSyANRsjsV-WdoLxM9yEz-yIgBFBdoUYPXCw";

const SPONSOR = {
  name: "Wenia",
  logo: null,
  totalInvestment: 4000,
};

const EPISODES = [
  {
    id: "E190",
    title: "Forecast 2026",
    date: "2026-01-22",
    videoId: "yIPNyvVyApk",
    youtubeUrl: "https://youtu.be/yIPNyvVyApk",
    spotifyUrl: "https://open.spotify.com/episode/2AuulJKgCSMJ6RfFkKWO4O",
    appleUrl: "https://podcasts.apple.com/cm/podcast/e190-forecast-2026-hern%C3%A1n-jaramillo-dar%C3%ADo-palacio-andr%C3%A9s/id1661010704?i=1000746183252",
    xUrl: "https://x.com/10ampro/status/2014317120536875511",
    substackUrl: "https://www.10am.pro/p/e190-forecast-2026",
    spotify: { plays: 6874 },
    x: { impressions: 2697 },
    substack: { views: 4460 },
  },
  {
    id: "E191",
    title: "Las 5 señales del cambio de era",
    date: "2026-01-29",
    videoId: "PdTGv5Z71SE",
    youtubeUrl: "https://youtu.be/PdTGv5Z71SE",
    spotifyUrl: "https://open.spotify.com/episode/6aM1jKEPafXHAHlu5LlCez",
    appleUrl: "https://podcasts.apple.com/us/podcast/e191-las-5-se%C3%B1ales-del-cambio-de-era-hern%C3%A1n-dar%C3%ADo/id1661010704?i=1000747145276",
    xUrl: "https://x.com/10ampro/status/2016853835294396623",
    substackUrl: "https://www.10am.pro/p/e191-las-5-senales-del-cambio-de",
    spotify: { plays: 6163 },
    x: { impressions: 1673 },
    substack: { views: 3490 },
  },
  {
    id: "E196",
    title: "Colombia 🇨🇴 vs Argentina 🇦🇷. Modelo económico y batalla cultural.",
    date: "2026-02-26",
    videoId: "5QWEatCbScI",
    youtubeUrl: "https://youtu.be/5QWEatCbScI",
    spotifyUrl: "https://open.spotify.com/episode/0vDtyoSUsQdMLfm9qGMOtt",
    appleUrl: "https://podcasts.apple.com/us/podcast/e196-colombia-vs-argentina-modelo-econ%C3%B3mico-y-batalla/id1661010704?i=1000751721814",
    xUrl: "https://x.com/10ampro/status/2027001953679446069",
    substackUrl: "https://www.10am.pro/p/e196-colombia-vs-argentina-modelo",
    spotify: { plays: 3165 },
    x: { impressions: 1444 },
    substack: { views: 3160 },
  },
  {
    id: "E198",
    title: "2028 🤯 El año que todos quedaremos sin trabajo",
    date: "2026-03-05",
    videoId: "leDK2mccGWM",
    youtubeUrl: "https://youtu.be/leDK2mccGWM",
    spotifyUrl: "https://open.spotify.com/episode/2Cv4pSEiHw6GWt6IfBcCRb",
    appleUrl: "https://podcasts.apple.com/us/podcast/e198-2028-el-a%C3%B1o-que-todos-quedaremos-sin-trabajo/id1661010704?i=1000753189322",
    xUrl: "https://x.com/10ampro/status/2029538669133283685",
    substackUrl: "https://www.10am.pro/p/e198-2028-el-ano-que-todos-quedaremos",
    spotify: { plays: 5660 },
    x: { impressions: 2996 },
    substack: { views: 3350 },
  },
  {
    id: "E199",
    title: "Construyendo el Internet del futuro ⚡️ Double Zero",
    date: "2026-03-12",
    videoId: "aVXkfdDOQJw",
    youtubeUrl: "https://youtu.be/aVXkfdDOQJw",
    spotifyUrl: "https://open.spotify.com/episode/4Nhf11HjBhKv8NUW30vNAK",
    appleUrl: "https://podcasts.apple.com/us/podcast/e199-construyendo-el-internet-del-futuro-double-zero/id1661010704?i=1000754822716",
    xUrl: "https://x.com/10ampro/status/2032075383693091213",
    substackUrl: "https://www.10am.pro/p/e199-construyendo-el-internet-del",
    spotify: { plays: 2871 },
    x: { impressions: 1273 },
    substack: { views: 2890 },
  },
  {
    id: "E200",
    title: "Irán 🇮🇷, petróleo 🛢, dólar 💵 y drones",
    date: "2026-03-19",
    videoId: "QbS-TGwMuw0",
    youtubeUrl: "https://youtu.be/QbS-TGwMuw0",
    spotifyUrl: "https://open.spotify.com/episode/0onH7EcXY1NVP9jY9TbPDT",
    appleUrl: "https://podcasts.apple.com/us/podcast/e200-ir%C3%A1n-petr%C3%B3leo-d%C3%B3lar-y-drones-hern%C3%A1n-dar%C3%ADo-guillermo/id1661010704?i=1000756112388",
    xUrl: "https://x.com/10ampro/status/2034612098651848950",
    substackUrl: "https://www.10am.pro/p/e200-iran-petroleo-dolar-y-drones",
    spotify: { plays: 3547 },
    x: { impressions: 1352 },
    substack: { views: 3220 },
  },
  {
    id: "E201",
    title: "Medellín tiene que convertirse en el Energy Valley. Ricardo Sierra",
    date: "2026-03-26",
    videoId: "w-JmwyOLuU8",
    youtubeUrl: "https://youtu.be/w-JmwyOLuU8",
    spotifyUrl: "https://open.spotify.com/episode/0JNPcy5YwYOeNUHQzkrkpi",
    appleUrl: "https://podcasts.apple.com/co/podcast/e201-medell%C3%ADn-tiene-que-convertirse-en-el-energy/id1661010704?i=1000757463944",
    xUrl: "https://x.com/10ampro/status/2037148813643952380",
    substackUrl: "https://www.10am.pro/p/e201-medellin-tiene-que-convertirse",
    spotify: { plays: 261 },
    x: { impressions: 1366 },
    substack: { views: 2150 },
  },
];

const YT_CHANNEL_ID = "UC1yKEFqN6Tzz9DTK7fwS3LQ"; // 10AMPRO YouTube channel

const CHANNEL_AUDIENCE = {
  youtube: 23800,
  spotify: 36527,
  apple: 6000,
  tiktok: 50100,
  instagram: 17605,
};

// ═══════════════════════════════════════════════════════════════

const fmt = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
};

const fmtUSD = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });

const fmtDate = (d) => {
  const date = new Date(d + "T12:00:00");
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
};

const daysSince = (d) => Math.max(0, Math.ceil((new Date() - new Date(d + "T12:00:00")) / (1000 * 60 * 60 * 24)));

export default function WeniaDashboard() {
  const [loaded, setLoaded] = useState(false);
  const [hoveredEp, setHoveredEp] = useState(null);
  const [ytData, setYtData] = useState({});
  const [ytLoading, setYtLoading] = useState(true);
  const [ytError, setYtError] = useState(null);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [autoStats, setAutoStats] = useState(null);
  const [ytSubs, setYtSubs] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Try to load cached auto-stats from localStorage
  useEffect(() => {
    try {
      const cached = window.localStorage?.getItem("wenia_auto_stats");
      if (cached) setAutoStats(JSON.parse(cached));
    } catch (e) {}
  }, []);

  const fetchYouTubeData = useCallback(async () => {
    setYtLoading(true);
    setYtError(null);
    try {
      const ids = EPISODES.map((e) => e.videoId).join(",");
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids}&key=${YT_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const mapped = {};
      if (data.items) {
        data.items.forEach((item) => {
          mapped[item.id] = {
            views: parseInt(item.statistics.viewCount || "0"),
            likes: parseInt(item.statistics.likeCount || "0"),
            title: item.snippet?.title || "",
          };
        });
      }
      setYtData(mapped);
      setFetchedAt(new Date());
      // Also fetch channel subscriber count
      try {
        const chUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`;
        const chRes = await fetch(chUrl);
        if (chRes.ok) {
          const chData = await chRes.json();
          if (chData.items?.[0]?.statistics?.subscriberCount) {
            setYtSubs(parseInt(chData.items[0].statistics.subscriberCount));
          }
        }
      } catch (e) {}
    } catch (err) {
      setYtError(err.message);
    } finally {
      setYtLoading(false);
    }
  }, []);

  useEffect(() => { fetchYouTubeData(); }, [fetchYouTubeData]);

  const getYt = (videoId, field) => ytData[videoId]?.[field] || 0;

  // Get Spotify/X/Substack data: auto-stats first, fallback to hardcoded
  const getSpotifyPlays = (ep) => {
    if (autoStats?.[ep.id]?.spotify_plays > 0) return autoStats[ep.id].spotify_plays;
    return ep.spotify.plays;
  };
  const getXImpressions = (ep) => {
    if (autoStats?.[ep.id]?.x_impressions > 0) return autoStats[ep.id].x_impressions;
    return ep.x?.impressions || 0;
  };
  const getSubstackViews = (ep) => {
    if (autoStats?.[ep.id]?.substack_views > 0) return autoStats[ep.id].substack_views;
    return ep.substack?.views || 0;
  };
  const autoUpdatedAt = autoStats?.updated_at ? new Date(autoStats.updated_at) : null;

  const totals = useMemo(() => {
    const ytViews = EPISODES.reduce((s, e) => s + getYt(e.videoId, "views"), 0);
    const spPlays = EPISODES.reduce((s, e) => s + getSpotifyPlays(e), 0);
    const appleEst = Math.round(spPlays * 0.45);
    const xImpressions = EPISODES.reduce((s, e) => s + getXImpressions(e), 0);
    const substackViews = EPISODES.reduce((s, e) => s + getSubstackViews(e), 0);
    const totalReach = ytViews + spPlays + appleEst + xImpressions + substackViews;
    const cpm = totalReach > 0 ? (SPONSOR.totalInvestment / totalReach) * 1000 : 0;
    return { ytViews, spPlays, appleEst, xImpressions, substackViews, totalReach, cpm };
  }, [ytData, autoStats]);

  const daysSinceFirst = daysSince(EPISODES[0].date);
  const hasData = totals.ytViews > 0;

  const getTitle = (ep) => ytData[ep.videoId]?.title || ep.title;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#06080C",
      color: "#E4E4E7",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 20% 0%, rgba(212,168,67,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(34,197,94,0.03) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 860, margin: "0 auto", padding: "clamp(20px, 4vw, 40px) clamp(14px, 3vw, 20px)",
        position: "relative", zIndex: 1,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* ─── HEADER ─── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 12, flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.15em",
              color: "#D4A843", textTransform: "uppercase", marginBottom: 6,
            }}>Reporte de Alcance</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(26px, 5vw, 38px)", fontWeight: 700,
              margin: 0, lineHeight: 1.1,
              background: "linear-gradient(135deg, #E4E4E7, #A1A1AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Wenia × 10AMPRO</h1>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            fontSize: 9,
            color: ytLoading ? "#F59E0B" : ytError ? "#EF4444" : "#22C55E",
            background: ytLoading ? "rgba(245,158,11,0.1)" : ytError ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
            padding: "4px 10px", borderRadius: 20,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: ytLoading ? "#F59E0B" : ytError ? "#EF4444" : "#22C55E",
              animation: ytLoading ? "pulse 1.5s infinite" : "none",
            }} />
            {ytLoading ? "Actualizando..." : ytError ? "Error" : "En vivo"}
          </div>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

        {/* ─── HERO: TOTAL REACH ─── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212,168,67,0.06), rgba(34,197,94,0.04))",
          border: "1px solid rgba(212,168,67,0.12)",
          borderRadius: 16, padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px)", marginBottom: 28,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 11, color: "#71717A", textTransform: "uppercase",
            letterSpacing: "0.12em", marginBottom: 8,
          }}>Alcance total de tu marca</div>
          <div style={{
            fontSize: "clamp(42px, 8vw, 64px)", fontWeight: 700,
            fontFamily: "'DM Sans'",
            color: "#D4A843", lineHeight: 1,
            marginBottom: 12,
          }}>
            {hasData ? fmt(totals.totalReach) : ytLoading ? "..." : "—"}
          </div>
          <div style={{
            fontSize: 12, color: "#A1A1AA", marginBottom: 20,
          }}>
            impresiones en {EPISODES.length} episodios · {daysSinceFirst} días y creciendo
          </div>

          {/* Platform breakdown */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "clamp(12px, 3vw, 24px)",
            flexWrap: "wrap",
          }}>
            {[
              { label: "YouTube", value: hasData ? fmt(totals.ytViews) : "...", color: "#FF0000", icon: "▶" },
              { label: "Spotify", value: fmt(totals.spPlays), color: "#1DB954", icon: "♫" },
              { label: "X", value: fmt(totals.xImpressions), color: "#E4E4E7", icon: "𝕏" },
              { label: "Substack", value: fmt(totals.substackViews), color: "#FF6719", icon: "✉" },
              { label: "Apple Podcasts", value: "~" + fmt(totals.appleEst), color: "#A855F7", icon: "🎧", est: true },
            ].map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{p.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: p.color, fontFamily: "'DM Sans'" }}>{p.value}</div>
                <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {p.label}{p.est ? " *" : ""}
                </div>
              </div>
            ))}
          </div>
          {hasData && (
            <div style={{
              marginTop: 20, fontSize: 11, color: "#52525B", fontStyle: "italic",
            }}>
              * Apple Podcasts estimado según proporción de mercado
            </div>
          )}
        </div>

        {/* ─── CPM STORY ─── */}
        {hasData && (
          <div style={{
            background: "rgba(34,197,94,0.04)",
            border: "1px solid rgba(34,197,94,0.1)",
            borderRadius: 12, padding: "20px 24px", marginBottom: 28,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#22C55E", marginBottom: 4 }}>
                Tu inversión se vuelve más eficiente cada día
              </div>
              <div style={{ fontSize: 11, color: "#71717A" }}>
                Cada view nuevo reduce el costo por impresión. Los episodios siguen generando alcance indefinidamente.
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                CPM actual
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E", fontFamily: "'DM Sans'" }}>
                {fmtUSD(Math.round(totals.cpm))}
              </div>
              <div style={{ fontSize: 9, color: "#52525B" }}>y bajando ↓</div>
            </div>
          </div>
        )}

        {/* ─── EPISODES ─── */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12, overflow: "hidden", marginBottom: 28,
        }}>
          <div style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA" }}>Episodios patrocinados</div>
          </div>

          {EPISODES.map((ep, i) => {
            const views = getYt(ep.videoId, "views");
            const spPlays = getSpotifyPlays(ep);
            const xImpr = getXImpressions(ep);
            const ssViews = getSubstackViews(ep);
            const appleEst = Math.round(spPlays * 0.45);
            const epTotal = views + spPlays + appleEst + xImpr + ssViews;
            return (
              <div key={ep.id}
                onMouseEnter={() => setHoveredEp(i)}
                onMouseLeave={() => setHoveredEp(null)}
                style={{
                  padding: "16px 20px",
                  borderBottom: i < EPISODES.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  background: hoveredEp === i ? "rgba(212,168,67,0.03)" : "transparent",
                  transition: "background 0.2s",
                }}>
                {/* Title row */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", marginBottom: 12,
                  flexWrap: "wrap", gap: 8,
                }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap",
                    }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: "#D4A843",
                        background: "rgba(212,168,67,0.1)",
                        padding: "2px 8px", borderRadius: 4,
                      }}>{ep.id}</span>
                      <span style={{ fontSize: 11, color: "#52525B" }}>{fmtDate(ep.date)}</span>
                      <span style={{
                        fontSize: 9, fontWeight: 600, color: "#22C55E",
                        background: "rgba(34,197,94,0.08)",
                        padding: "2px 6px", borderRadius: 4,
                      }}>{daysSince(ep.date)}d activo</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#E4E4E7", lineHeight: 1.4 }}>
                      {getTitle(ep)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <a href={ep.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 10, color: "#FF0000", textDecoration: "none",
                        border: "1px solid rgba(255,0,0,0.2)",
                        padding: "4px 10px", borderRadius: 6, background: "rgba(255,0,0,0.05)",
                      }}>▶ YouTube</a>
                    <a href={ep.spotifyUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 10, color: "#1DB954", textDecoration: "none",
                        border: "1px solid rgba(29,185,84,0.2)",
                        padding: "4px 10px", borderRadius: 6, background: "rgba(29,185,84,0.05)",
                      }}>♫ Spotify</a>
                    <a href={ep.xUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 10, color: "#E4E4E7", textDecoration: "none",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.03)",
                      }}>𝕏 Post</a>
                    <a href={ep.substackUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 10, color: "#FF6719", textDecoration: "none",
                        border: "1px solid rgba(255,103,25,0.2)",
                        padding: "4px 10px", borderRadius: 6, background: "rgba(255,103,25,0.05)",
                      }}>✉ Substack</a>
                    <a href={ep.appleUrl} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 10, color: "#A855F7", textDecoration: "none",
                        border: "1px solid rgba(168,85,247,0.2)",
                        padding: "4px 10px", borderRadius: 6, background: "rgba(168,85,247,0.05)",
                      }}>🎧 Apple</a>
                  </div>
                </div>

                {/* Stats: simple, consistent */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                  gap: 8,
                }}>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(255,255,255,0.03)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>YouTube</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: ytLoading ? "#3F3F46" : views > 0 ? "#FF0000" : "#3F3F46" }}>
                      {ytLoading ? "..." : views > 0 ? fmt(views) : "—"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(255,255,255,0.03)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Spotify</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: spPlays > 0 ? "#1DB954" : "#3F3F46" }}>
                      {spPlays > 0 ? fmt(spPlays) : "—"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(255,255,255,0.03)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>X</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: xImpr > 0 ? "#E4E4E7" : "#3F3F46" }}>
                      {xImpr > 0 ? fmt(xImpr) : "—"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(255,255,255,0.03)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Substack</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: ssViews > 0 ? "#FF6719" : "#3F3F46" }}>
                      {ssViews > 0 ? fmt(ssViews) : "—"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.02)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(255,255,255,0.03)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Apple *</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: appleEst > 0 ? "#A855F7" : "#3F3F46" }}>
                      {appleEst > 0 ? "~" + fmt(appleEst) : "—"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(212,168,67,0.03)", borderRadius: 6,
                    padding: "8px 10px", border: "1px solid rgba(212,168,67,0.08)",
                  }}>
                    <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Alcance total</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: epTotal > 0 ? "#D4A843" : "#3F3F46" }}>
                      {ytLoading ? "..." : epTotal > 0 ? fmt(epTotal) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── SHORTS REACH ─── */}
        <a href="https://10ampro-shorts-analytics.vercel.app/" target="_blank" rel="noopener noreferrer"
          style={{
            display: "block", textDecoration: "none",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 12, padding: "20px", marginBottom: 28,
            transition: "border-color 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(212,168,67,0.2)"}
          onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}
        >
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA", marginBottom: 4 }}>
                Alcance adicional vía Shorts
              </div>
              <div style={{ fontSize: 11, color: "#52525B" }}>
                Clips cortos de cada episodio distribuidos en TikTok, Instagram, YouTube Shorts y X — amplificando el alcance de tu marca más allá del episodio completo.
              </div>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600, color: "#D4A843",
              background: "rgba(212,168,67,0.1)",
              padding: "6px 14px", borderRadius: 6,
              whiteSpace: "nowrap",
            }}>
              Ver analytics en vivo ↗
            </div>
          </div>
        </a>

        {/* ─── AUDIENCE CONTEXT ─── */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12, padding: "20px", marginBottom: 28,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA", marginBottom: 14 }}>
            Ecosistema 10AMPRO
          </div>
          <div style={{ fontSize: 11, color: "#52525B", marginBottom: 16 }}>
            Más allá de los episodios patrocinados, tu marca tiene presencia en un ecosistema de {fmt((ytSubs || CHANNEL_AUDIENCE.youtube) + CHANNEL_AUDIENCE.spotify + CHANNEL_AUDIENCE.apple + CHANNEL_AUDIENCE.tiktok + CHANNEL_AUDIENCE.instagram)} seguidores.
          </div>
          <div style={{
            display: "flex", justifyContent: "center", gap: 16,
            flexWrap: "wrap",
          }}>
            {[
              { name: "YouTube", value: ytSubs || CHANNEL_AUDIENCE.youtube, color: "#FF0000", icon: "▶" },
              { name: "Spotify", value: CHANNEL_AUDIENCE.spotify, color: "#1DB954", icon: "♫" },
              { name: "TikTok", value: CHANNEL_AUDIENCE.tiktok, color: "#E4E4E7", icon: "♪" },
              { name: "Instagram", value: CHANNEL_AUDIENCE.instagram, color: "#E1306C", icon: "📷" },
              { name: "Apple", value: CHANNEL_AUDIENCE.apple, color: "#A855F7", icon: "🎧" },
            ].map((ch, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: 60 }}>
                <div style={{ fontSize: 14, marginBottom: 2 }}>{ch.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: ch.color, fontFamily: "'DM Sans'" }}>{fmt(ch.value)}</div>
                <div style={{ fontSize: 8, color: "#52525B", textTransform: "uppercase" }}>{ch.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: 16,
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 10, color: "#3F3F46", lineHeight: 1.6 }}>
            <div>▶ YouTube — en vivo{fetchedAt ? ` · ${fetchedAt.toLocaleString("es-ES")}` : ""}</div>
            <div>♫ Spotify — {autoUpdatedAt ? `auto-actualizado: ${autoUpdatedAt.toLocaleDateString("es-ES")}` : "última actualización: 21 mar 2026"}</div>
            <div>𝕏 X — {autoUpdatedAt ? `auto-actualizado: ${autoUpdatedAt.toLocaleDateString("es-ES")}` : "última actualización: 21 mar 2026"}</div>
            <div>✉ Substack — {autoUpdatedAt ? `auto-actualizado: ${autoUpdatedAt.toLocaleDateString("es-ES")}` : "última actualización: 21 mar 2026"}</div>
            <div>🎧 Apple — estimado según proporción de mercado</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, color: "#3F3F46" }}>Powered by</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#D4A843" }}>10AMPRO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

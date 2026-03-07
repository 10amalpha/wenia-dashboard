"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// WENIA SPONSOR DASHBOARD — 10AMPRO
// YouTube stats fetched LIVE via YouTube Data API v3
// Spotify plays are manual (no public API)
// ═══════════════════════════════════════════════════════════════

const YT_API_KEY = "AIzaSyANRsjsV-WdoLxM9yEz-yIgBFBdoUYPXCw";

const SPONSOR = {
  name: "Wenia",
  logo: null,
  tier: "Patrocinador",
  totalInvestment: 4000,
};

const EPISODES = [
  {
    id: "E191",
    title: "Las 5 señales del cambio de era",
    date: "2026-01-29",
    videoId: "PdTGv5Z71SE",
    youtubeUrl: "https://youtu.be/PdTGv5Z71SE",
    spotifyUrl: "https://open.spotify.com/episode/6aM1jKEPafXHAHlu5LlCez",
    appleUrl: "https://podcasts.apple.com/us/podcast/e191-las-5-se%C3%B1ales-del-cambio-de-era-hern%C3%A1n-dar%C3%ADo/id1661010704?i=1000747145276",
    spotify: { plays: 6000, consumptionHrs: 2133, medianTime: "35m 59s", videoViewers: 1472, videoViewerPct: 76.6, watchHrs: 952 },
    apple: { plays: null },
  },
  {
    id: "E196",
    title: "Colombia 🇨🇴 vs Argentina 🇦🇷. Modelo económico y batalla cultural.",
    date: "2026-02-26",
    videoId: "5QWEatCbScI",
    youtubeUrl: "https://youtu.be/5QWEatCbScI",
    spotifyUrl: "https://open.spotify.com/episode/0vDtyoSUsQdMLfm9qGMOtt",
    appleUrl: "https://podcasts.apple.com/us/podcast/e196-colombia-vs-argentina-modelo-econ%C3%B3mico-y-batalla/id1661010704?i=1000751721814",
    spotify: { plays: 2661, consumptionHrs: 919, medianTime: "53m 24s", videoViewers: 727, videoViewerPct: 71.2, watchHrs: 372 },
    apple: { plays: null },
  },
  {
    id: "E198",
    title: "2028 🤯 El año que todos quedaremos sin trabajo",
    date: "2026-03-05",
    videoId: "leDK2mccGWM",
    youtubeUrl: "https://youtu.be/leDK2mccGWM",
    spotifyUrl: "https://open.spotify.com/episode/2Cv4pSEiHw6GWt6IfBcCRb",
    appleUrl: "https://podcasts.apple.com/us/podcast/e198-2028-el-a%C3%B1o-que-todos-quedaremos-sin-trabajo/id1661010704?i=1000753189322",
    spotify: { plays: 1450, consumptionHrs: 246, medianTime: "34m 3s", videoViewers: 236, videoViewerPct: 76.4, watchHrs: 107 },
    apple: { plays: null },
  },
];

const CHANNEL_AUDIENCE = {
  youtube: 23300,
  spotify: 38600,
  apple: 6000,
  tiktok: 48800,
  instagram: 16200,
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

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fetchYouTubeData = useCallback(async () => {
    setYtLoading(true);
    setYtError(null);
    try {
      const ids = EPISODES.map((e) => e.videoId).join(",");
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids}&key=${YT_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
      const data = await res.json();
      const mapped = {};
      if (data.items) {
        data.items.forEach((item) => {
          mapped[item.id] = {
            views: parseInt(item.statistics.viewCount || "0"),
            likes: parseInt(item.statistics.likeCount || "0"),
            comments: parseInt(item.statistics.commentCount || "0"),
            title: item.snippet?.title || "",
          };
        });
      }
      setYtData(mapped);
      setFetchedAt(new Date());
    } catch (err) {
      console.error("YouTube fetch error:", err);
      setYtError(err.message);
    } finally {
      setYtLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYouTubeData();
  }, [fetchYouTubeData]);

  const getYt = (videoId, field) => {
    if (ytData[videoId]) return ytData[videoId][field] || 0;
    return 0;
  };

  const totals = useMemo(() => {
    const ytViews = EPISODES.reduce((s, e) => s + getYt(e.videoId, "views"), 0);
    const ytLikes = EPISODES.reduce((s, e) => s + getYt(e.videoId, "likes"), 0);
    const ytComments = EPISODES.reduce((s, e) => s + getYt(e.videoId, "comments"), 0);
    const spPlays = EPISODES.reduce((s, e) => s + e.spotify.plays, 0);
    const spHours = EPISODES.reduce((s, e) => s + (e.spotify.consumptionHrs || 0), 0);
    const appleEstimate = Math.round(spPlays * 0.45); // ~45% of Spotify (industry ratio)
    const totalImpressions = ytViews + spPlays + appleEstimate;
    const cpm = totalImpressions > 0 ? (SPONSOR.totalInvestment / totalImpressions) * 1000 : 0;
    const avgViewsPerEp = EPISODES.length > 0 ? ytViews / EPISODES.length : 0;
    return { ytViews, ytLikes, ytComments, spPlays, spHours, appleEstimate, totalImpressions, cpm, avgViewsPerEp };
  }, [ytData]);

  const daysSinceFirst = daysSince(EPISODES[0].date);
  const hasData = totals.ytViews > 0;

  const getTitle = (ep) => {
    if (ytData[ep.videoId]?.title) return ytData[ep.videoId].title;
    return ep.title;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#06080C",
      color: "#E4E4E7",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 20% 0%, rgba(212,168,67,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(34,197,94,0.03) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "32px 20px",
        position: "relative", zIndex: 1,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>

        {/* HEADER */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 40, flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 600, letterSpacing: "0.15em",
              color: "#D4A843", textTransform: "uppercase", marginBottom: 6,
            }}>Sponsor Dashboard</div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700,
              margin: 0, lineHeight: 1.1,
              background: "linear-gradient(135deg, #E4E4E7, #A1A1AA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Wenia × 10AMPRO</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #D4A843, #B8860B)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#06080C",
            }}>W</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Wenia</div>
              <div style={{ fontSize: 11, color: "#71717A" }}>{SPONSOR.tier}</div>
            </div>
          </div>
        </div>

        {/* LIVE BANNER */}
        <div style={{
          background: "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(212,168,67,0.06))",
          border: "1px solid rgba(34,197,94,0.12)",
          borderRadius: 12, padding: "14px 20px", marginBottom: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 18 }}>📈</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#22C55E" }}>Exposición continua</div>
              <div style={{ fontSize: 11, color: "#71717A" }}>Los episodios siguen acumulando views — tu inversión crece con el tiempo.</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div style={{
              fontSize: 10, fontWeight: 600, color: "#D4A843",
              background: "rgba(212,168,67,0.1)",
              padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap",
            }}>{daysSinceFirst}+ días generando impresiones</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 9,
              color: ytLoading ? "#F59E0B" : ytError ? "#EF4444" : "#22C55E",
              background: ytLoading ? "rgba(245,158,11,0.1)" : ytError ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
              padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: ytLoading ? "#F59E0B" : ytError ? "#EF4444" : "#22C55E",
                animation: ytLoading ? "pulse 1.5s infinite" : "none",
              }} />
              {ytLoading ? "Cargando..." : ytError ? "Error API" : "YouTube en vivo"}
            </div>
          </div>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>

        {/* KPI CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12, marginBottom: 32,
        }}>
          {[
            { label: "Episodios", value: EPISODES.length, icon: "🎙️", color: "#D4A843" },
            { label: "Views YouTube", value: hasData ? fmt(totals.ytViews) : ytLoading ? "..." : "—", icon: "▶", color: "#FF0000" },
            { label: "Plays Spotify", value: totals.spPlays > 0 ? fmt(totals.spPlays) : "—", icon: "♫", color: "#1DB954" },
            { label: "Est. Apple Pods", value: totals.appleEstimate > 0 ? "~" + fmt(totals.appleEstimate) : "—", icon: "🎧", color: "#A855F7" },
            { label: "Impresiones Totales", value: hasData ? fmt(totals.totalImpressions) : ytLoading ? "..." : "—", icon: "👁", color: "#818CF8" },
            { label: "CPM Efectivo", value: hasData ? fmtUSD(Math.round(totals.cpm)) : "—", icon: "💰", color: "#22C55E" },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10, padding: "16px 14px",
              position: "relative", overflow: "hidden",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(8px)",
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s`,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${kpi.color}60, transparent)`,
              }} />
              <div style={{ fontSize: 14, marginBottom: 8 }}>{kpi.icon}</div>
              <div style={{
                fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700,
                fontFamily: "'DM Sans'", color: kpi.color,
                marginBottom: 4, lineHeight: 1,
              }}>{kpi.value}</div>
              <div style={{
                fontSize: 10, color: "#52525B", textTransform: "uppercase",
                letterSpacing: "0.08em", fontWeight: 500,
              }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* EPISODES */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12, overflow: "hidden", marginBottom: 32,
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA" }}>Episodios Patrocinados</div>
            <div style={{ fontSize: 10, color: "#52525B" }}>{EPISODES.length} episodios · datos en tiempo real</div>
          </div>

          {EPISODES.map((ep, i) => {
            const views = getYt(ep.videoId, "views");
            const likes = getYt(ep.videoId, "likes");
            const comments = getYt(ep.videoId, "comments");
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
                      }}>{daysSince(ep.date)} días acumulando</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#E4E4E7", lineHeight: 1.4 }}>
                      {getTitle(ep)}
                    </div>
                  </div>
                  {ep.youtubeUrl && (
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
                      <a href={ep.appleUrl} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontSize: 10, color: "#A855F7", textDecoration: "none",
                          border: "1px solid rgba(168,85,247,0.2)",
                          padding: "4px 10px", borderRadius: 6, background: "rgba(168,85,247,0.05)",
                        }}>🎧 Apple</a>
                    </div>
                  )}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: 8,
                }}>
                  {[
                    { label: "Views YouTube", value: views, color: "#FF0000", isYt: true },
                    { label: "Plays Spotify", value: ep.spotify.plays, color: "#1DB954", isYt: false },
                  ].map((stat, j) => (
                    <div key={j} style={{
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: 6, padding: "8px 10px",
                      border: "1px solid rgba(255,255,255,0.03)",
                    }}>
                      <div style={{
                        fontSize: 9, color: "#52525B", textTransform: "uppercase",
                        letterSpacing: "0.08em", marginBottom: 3,
                      }}>{stat.label}</div>
                      <div style={{
                        fontSize: 16, fontWeight: 700,
                        color: (ytLoading && stat.isYt) ? "#3F3F46" : stat.value > 0 ? stat.color : "#3F3F46",
                      }}>
                        {(ytLoading && stat.isYt) ? "..." : stat.value > 0 ? fmt(stat.value) : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* AUDIENCE */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12, padding: "20px", marginBottom: 32,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#A1A1AA", marginBottom: 16 }}>
            Audiencia Total del Canal
          </div>
          <div style={{ fontSize: 11, color: "#52525B", marginBottom: 16 }}>
            Tu marca tiene exposición indirecta a toda la audiencia de 10AMPRO a través de cada episodio patrocinado.
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: 10,
          }}>
            {[
              { name: "YouTube", value: CHANNEL_AUDIENCE.youtube, icon: "▶", color: "#FF0000" },
              { name: "Spotify", value: CHANNEL_AUDIENCE.spotify, icon: "♫", color: "#1DB954" },
              { name: "TikTok", value: CHANNEL_AUDIENCE.tiktok, icon: "♪", color: "#E4E4E7" },
              { name: "Instagram", value: CHANNEL_AUDIENCE.instagram, icon: "📷", color: "#E1306C" },
              { name: "Apple Pods", value: CHANNEL_AUDIENCE.apple, icon: "🎧", color: "#A855F7" },
            ].map((ch, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "12px 8px",
                background: "rgba(255,255,255,0.015)", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.03)",
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{ch.icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: ch.color, fontFamily: "'DM Sans'" }}>{fmt(ch.value)}</div>
                <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{ch.name}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16, padding: "12px 16px",
            background: "rgba(212,168,67,0.05)",
            border: "1px solid rgba(212,168,67,0.1)",
            borderRadius: 8,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 8,
          }}>
            <div style={{ fontSize: 12, color: "#A1A1AA" }}>Audiencia combinada</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#D4A843", fontFamily: "'DM Sans'" }}>
              {fmt(Object.values(CHANNEL_AUDIENCE).reduce((a, b) => a + b, 0))}
            </div>
          </div>
        </div>

        {/* ROI */}
        {hasData && (
          <div style={{
            background: "rgba(34,197,94,0.03)",
            border: "1px solid rgba(34,197,94,0.1)",
            borderRadius: 12, padding: "20px", marginBottom: 32,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#22C55E", marginBottom: 16 }}>
              Retorno de Inversión
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}>
              <div style={{ padding: "12px 0" }}>
                <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>CPM Efectivo</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E" }}>{fmtUSD(Math.round(totals.cpm))}</div>
                <div style={{ fontSize: 10, color: "#71717A", marginTop: 4 }}>vs. benchmark industria: $50–$150 CPM</div>
              </div>
              <div style={{ padding: "12px 0" }}>
                <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Costo por View</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E" }}>
                  {totals.ytViews > 0 ? fmtUSD(parseFloat((SPONSOR.totalInvestment / totals.ytViews).toFixed(2))) : "—"}
                </div>
              </div>
              <div style={{ padding: "12px 0" }}>
                <div style={{ fontSize: 9, color: "#52525B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Views Promedio / Episodio</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#22C55E" }}>{fmt(Math.round(totals.avgViewsPerEp))}</div>
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {ytError && (
          <div style={{
            background: "rgba(239,68,68,0.05)",
            border: "1px solid rgba(239,68,68,0.15)",
            borderRadius: 12, padding: "16px 20px", marginBottom: 32,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 10,
          }}>
            <div style={{ fontSize: 12, color: "#EF4444" }}>
              No se pudieron cargar los datos de YouTube: {ytError}
            </div>
            <button onClick={fetchYouTubeData}
              style={{
                fontSize: 11, fontWeight: 600, color: "#E4E4E7",
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                padding: "6px 14px", borderRadius: 6, cursor: "pointer",
              }}>Reintentar</button>
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          paddingTop: 20,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: 10, color: "#3F3F46" }}>
            {fetchedAt ? `Datos YouTube: ${fetchedAt.toLocaleString("es-ES")}` : "Cargando datos..."}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 10, color: "#3F3F46" }}>Powered by</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#D4A843", fontFamily: "'DM Sans'" }}>10AMPRO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

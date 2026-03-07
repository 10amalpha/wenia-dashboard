import { NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

const EPISODES = [
  {
    id: "E191",
    spotifyUrl: "https://open.spotify.com/episode/6aM1jKEPafXHAHlu5LlCez",
    substackSlug: "e191-las-5-senales-del-cambio-de",
    xPostId: "2016853835294396623",
  },
  {
    id: "E196",
    spotifyUrl: "https://open.spotify.com/episode/0vDtyoSUsQdMLfm9qGMOtt",
    substackSlug: "e196-colombia-vs-argentina-modelo",
    xPostId: "2027001953679446069",
  },
  {
    id: "E198",
    spotifyUrl: "https://open.spotify.com/episode/2Cv4pSEiHw6GWt6IfBcCRb",
    substackSlug: "e198-2028-el-ano-que-todos-quedaremos",
    xPostId: "2029538669133283685",
  },
];

async function askClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} - ${err}`);
  }

  const data = await res.json();
  const textBlocks = data.content.filter((b) => b.type === "text");
  return textBlocks.map((b) => b.text).join("\n");
}

export async function GET(request) {
  // Verify cron secret or allow manual trigger with secret
  const authHeader = request.headers.get("authorization");
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (authHeader !== `Bearer ${CRON_SECRET}` && secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });
  }

  try {
    const episodeIds = EPISODES.map((e) => e.id).join(", ");
    const spotifyUrls = EPISODES.map((e) => `${e.id}: ${e.spotifyUrl}`).join("\n");

    const prompt = `I need you to look up current stats for these podcast episodes from 10AMPRO. Search for each one and give me the data.

SPOTIFY - Visit each URL and tell me the play count shown on the page:
${spotifyUrls}

SUBSTACK - Search for these posts on 10am.pro and tell me the view counts:
${EPISODES.map((e) => `${e.id}: https://www.10am.pro/p/${e.substackSlug}`).join("\n")}

X/TWITTER - Search for these posts and tell me the impression/view counts:
${EPISODES.map((e) => `${e.id}: https://x.com/10ampro/status/${e.xPostId}`).join("\n")}

IMPORTANT: Respond ONLY with a JSON object in this exact format, no markdown, no backticks, no explanation:
{
  "E191": { "spotify_plays": NUMBER, "substack_views": NUMBER, "x_impressions": NUMBER },
  "E196": { "spotify_plays": NUMBER, "substack_views": NUMBER, "x_impressions": NUMBER },
  "E198": { "spotify_plays": NUMBER, "substack_views": NUMBER, "x_impressions": NUMBER },
  "updated_at": "ISO_DATE_STRING"
}

If you cannot find a specific number, use -1 for that field. Use the actual numbers you find, not estimates.`;

    const response = await askClaude(prompt);

    // Parse the JSON response
    let stats;
    try {
      const cleaned = response.replace(/```json|```/g, "").trim();
      stats = JSON.parse(cleaned);
    } catch (parseErr) {
      return NextResponse.json(
        { error: "Failed to parse Claude response", raw: response },
        { status: 500 }
      );
    }

    // Add timestamp
    stats.updated_at = new Date().toISOString();

    // Return the stats (frontend will read this)
    return NextResponse.json(stats);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

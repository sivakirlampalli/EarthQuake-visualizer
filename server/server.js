// server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

// ✅ Mock dynamic summary instead of OpenAI
app.post("/api/summary", async (req, res) => {
  try {
    const { events } = req.body;

    if (!events || events.length === 0) {
      return res.json({ summary: "No earthquake events available." });
    }

    const total = events.length;
    const mags = events.map((e) => e.mag || 0);
    const maxMag = Math.max(...mags);
    const strongest = events.find((e) => e.mag === maxMag);

    const under3 = mags.filter((m) => m < 3).length;
    const between3to5 = mags.filter((m) => m >= 3 && m < 5).length;
    const above5 = mags.filter((m) => m >= 5).length;

    const templates = [
      `📊 In the last period, ${total} earthquakes were detected. Minor quakes (<3) made up ${under3}, moderate (3–5) were ${between3to5}, and ${above5} were strong. The strongest reached M${maxMag} near ${strongest.place}.`,
      `🌍 Seismic activity update: ${total} total quakes recorded. ${under3} were small tremors, ${between3to5} were moderate, and ${above5} were significant. The largest quake (M${maxMag}) occurred at ${strongest.place}.`,
      `⚡ Recently, ${total} earthquakes shook the region. The highlight was M${maxMag} at ${strongest.place}. Distribution: ${under3} minor, ${between3to5} moderate, ${above5} strong.`,
      `📌 Earthquake summary: ${total} events in total. Most were small, but the strongest measured M${maxMag} near ${strongest.place}.`
    ];

    const fakeSummary = templates[Math.floor(Math.random() * templates.length)];
    res.json({ summary: fakeSummary });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// ✅ Serve React build in production
const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`✅ App running on http://localhost:${PORT}`)
);

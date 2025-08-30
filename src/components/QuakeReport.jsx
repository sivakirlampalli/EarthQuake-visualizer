import { useState, useMemo } from "react";

function buildPayload(data, filters) {
  const features = data?.features ?? [];
  const sorted = [...features].sort(
    (a, b) => (b.properties.mag || 0) - (a.properties.mag || 0)
  );

  const mags = features
    .map((f) => f.properties.mag)
    .filter((m) => typeof m === "number");

  const total = features.length;
  const gte5 = mags.filter((m) => m >= 5).length;
  const between3and5 = mags.filter((m) => m >= 3 && m < 5).length;
  const lt3 = mags.filter((m) => m < 3).length;

  const top = sorted.slice(0, 30).map((f) => ({
    mag: f.properties.mag,
    place: f.properties.place,
    time: f.properties.time,
    depth: f.geometry.coordinates[2],
    coords: {
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
    },
  }));

  const strongest = top[0] || null;

  return {
    filters,
    stats: { total, lt3, between3and5, gte5, strongest },
    events: top,
  };
}

export default function QuakeReport({ data, filters }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const payload = useMemo(() => buildPayload(data, filters), [data, filters]);

  async function handleGenerate() {
    try {
      setLoading(true);
      setError("");
      setSummary("");

      const res = await fetch("http://localhost:5001/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate summary");
      setSummary(json.summary);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="report-panel">
      <div className="report-header">
        <h3>🧠 Quake Report (LLM)</h3>
        <button className="btn-primary" onClick={handleGenerate} disabled={loading || !data}>
          {loading ? "Generating…" : "Generate Report"}
        </button>
      </div>

      {!data && <div className="muted">Load data to generate a report.</div>}
      {error && <div className="error">{error}</div>}
      {summary && (
        <div className="report-output" role="region" aria-live="polite">
          {summary}
        </div>
      )}
    </div>
  );
}

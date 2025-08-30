// src/pages/EarthquakePage.jsx
import { useState, useEffect } from 'react';
import { fetchEarthquakes } from '../api/usgs';
import FiltersPanel from '../components/FiltersPanel';
import MapView from '../components/MapView';
import ErrorNotice from '../components/ErrorNotice';
import '../styles/App.css';

export default function EarthquakePage() {
  const [filters, setFilters] = useState({ period: 'day', minMag: 'all' });
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Report states
  const [report, setReport] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchEarthquakes(filters)
      .then(res => {
        setData(res);
        setError('');
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filters]);

  const generateReport = async () => {
    if (!data) return;
    setReport('');
    setReportLoading(true);

    try {
      const events = data.features.map(f => ({
        mag: f.properties.mag,
        place: f.properties.place,
        depth: f.geometry.coordinates[2],
        time: f.properties.time,
      }));

      const stats = {
        total: events.length,
        avgMag:
          events.reduce((sum, e) => sum + (e.mag || 0), 0) / events.length || 0,
      };

      const res = await fetch('http://localhost:5001/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters, stats, events }),
      });

      const json = await res.json();
      setReport(json.summary || 'No summary returned');
    } catch (err) {
      setReport('⚠️ Failed to generate report.');
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="visualizer-page">
      <div className="app-header">
        <h1>🌍 Earthquake Visualizer</h1>
        <p>Recent global seismic activity</p>
      </div>

      <FiltersPanel filters={filters} setFilters={setFilters} />

      {loading && <div className="loader"></div>}
      {error && <ErrorNotice msg={error} />}
      {!error && !loading && <MapView data={data} />}

      {/* Report Section */}
      {!loading && !error && (
        <div className="report-panel">
          <button onClick={generateReport} disabled={reportLoading} className="btn-generate">
            {reportLoading ? '⏳ Generating...' : '🧠 Generate Report'}
          </button>

          {report && (
            <div className="report-box">
              <ul>
                {report
                  .split("\n")
                  .filter(line => line.trim().length > 0)
                  .map((line, idx) => (
                    <li key={idx}>{line.replace(/^[-•]\s*/, "")}</li>
                  ))}
              </ul>
              <small className="demo-note">(The real AI-powered summaries use OpenAI’s API,  
  but since the account requires a paid billing plan,  
  this demo version generates a local summary instead.  )</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

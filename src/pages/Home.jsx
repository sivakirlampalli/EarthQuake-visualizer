// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero">
        <h1>🌍 Earthquake Insights</h1>
        <p>Visualize, analyze, and generate reports on global seismic activity.</p>
        <Link to="/visualizer" className="cta-btn">
          🚀 Launch Visualizer
        </Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Use This Tool?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📊 Interactive Map</h3>
            <p>
              Explore real-time earthquake events on a dynamic world map with
              magnitude-based markers.
            </p>
          </div>
          <div className="feature-card">
            <h3>🧠 Smart Reports</h3>
            <p>
              Generate concise AI-powered summaries highlighting key seismic
              patterns and risks.
            </p>
          </div>
          <div className="feature-card">
            <h3>⚡ Quick Filters</h3>
            <p>
              Filter earthquakes by time range, magnitude, and location to focus
              on what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Ready to Explore?</h2>
        <p>
          Jump into the visualizer and uncover insights from real-time seismic
          data.
        </p>
        <Link to="/visualizer" className="cta-btn big">
          🌍 Go to Visualizer
        </Link>
      </section>
    </div>
  );
}

export default Home;

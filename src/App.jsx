// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import EarthquakePage from './pages/EarthquakePage';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="site-root">
      {/* Navigation bar always visible */}
      <NavBar />

      {/* Page Content */}
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<EarthquakePage />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 40, textAlign: 'center' }}>
                404 — Page not found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
}

export default App;

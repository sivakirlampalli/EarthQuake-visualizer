// src/components/NavBar.jsx
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="nav-header">
      <div className="nav-inner">
        <div className="brand">
          <span className="brand-emoji">🌍</span>
          <span className="brand-title">QuakeDash</span>
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/visualizer" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Earthquake Visualizer
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

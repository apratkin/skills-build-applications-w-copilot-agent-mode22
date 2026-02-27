import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <div className="app-shell container py-4 py-md-5">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center mb-4">
            <div>
              <h1 className="display-6 fw-semibold mb-1">OctoFit Tracker</h1>
              <p className="text-secondary mb-0">Track progress, teams, and fitness goals in one place.</p>
            </div>
            <a
              className="btn btn-outline-primary"
              href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
              target="_blank"
              rel="noreferrer"
            >
              Bootstrap Docs
            </a>
          </div>

          <ul className="nav nav-tabs flex-wrap gap-2 border-0" aria-label="Main navigation">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) => `nav-link rounded-pill ${isActive ? 'active' : ''}`}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

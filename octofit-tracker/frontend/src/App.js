import './App.css';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">OctoFit Tracker</h1>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Main navigation">
        <Link className="nav-link" to="/users">
          Users
        </Link>
        <Link className="nav-link" to="/teams">
          Teams
        </Link>
        <Link className="nav-link" to="/activities">
          Activities
        </Link>
        <Link className="nav-link" to="/leaderboard">
          Leaderboard
        </Link>
        <Link className="nav-link" to="/workouts">
          Workouts
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;

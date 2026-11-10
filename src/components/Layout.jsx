import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import { GRADING } from '../data/seed.js';

const NAV = [['dashboard', 'Dashboard'], ['students', 'Student List'], ['marks', 'Marks'], ['attendance', 'Attendance'], ['remarks', 'Remarks'], ['reports', 'Reports']];

// Sidebar + header shared by all logged-in pages.
export default function Layout() {
  const { user, logout } = useAuth();
  const { grading, pickGrading } = useData();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const title = NAV.find(([k]) => '/' + k === pathname)?.[1] || '';
  const initial = user.name.replace(/^(Dr\.|Prof\.|Parent of)\s*/, '')[0];
  return (
    <>
      <nav aria-label="Main">
        <div className="brand">Student Report System</div>
        {NAV.map(([k, l]) => (
          <NavLink key={k} to={'/' + k} className={({ isActive }) => 'l' + (isActive ? ' on' : '')}>{l}</NavLink>
        ))}
        <div className="sp" />
        <div className="prof">
          <div className="av">{initial}</div>
          <div><b style={{ fontSize: 13 }}>{user.name}</b><br /><span className="note">{user.role === 'admin' ? 'Admin' : 'User'}</span></div>
        </div>
        <button className="btn o s" onClick={() => { logout(); nav('/login'); }}>Logout</button>
      </nav>
      <main>
        <header className="top">
          <h1>{title}</h1>
          <div className="ctl noprint">
            <label htmlFor="gs" style={{ margin: 0 }}>Grading</label>
            <select id="gs" value={grading} onChange={(e) => pickGrading(e.target.value)}>
              {Object.entries(GRADING).map(([k, g]) => <option key={k} value={k}>{g.label}</option>)}
            </select>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}

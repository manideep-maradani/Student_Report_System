import { TERMS } from '../data/seed.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

export const Badge = ({ v }) => <span className={'bg ' + v[1]}>{v[0]}</span>;

// Progress bar. The CSS colours it by level (green / amber / red) using aria-label.
export const LevelBar = ({ p }) => (
  <div className="bar" role="img" aria-label={p + '%'}><i style={{ width: Math.min(p, 100) + '%' }} /></div>
);

export const StatCard = ({ label, value, note = '' }) => (
  <div className="card kpi"><span>{label}</span><b>{value}</b><span>{note}</span></div>
);

// Admin-only dropdown to choose which student to view or edit.
export function StudentPicker() {
  const { user } = useAuth();
  const { students, sid, pickStudent } = useData();
  if (user.role !== 'admin') return null;
  return (
    <div className="ctl" style={{ marginBottom: 14 }}>
      <label htmlFor="sp" style={{ margin: 0 }}>Student</label>
      <select id="sp" value={sid} onChange={(e) => pickStudent(e.target.value)}>
        {students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
      </select>
    </div>
  );
}

// Simple SVG line chart of performance across terms.
export function LineChart({ vals }) {
  const w = 420, h = 170, p = 28;
  const x = (i) => p + (i * (w - 2 * p)) / (vals.length - 1);
  const y = (v) => h - p - ((v - 40) / 60) * (h - 2 * p);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={'Performance: ' + vals.join(', ')}>
      {[40, 60, 80, 100].map((v) => (
        <g key={v}><line x1={p} x2={w - p} y1={y(v)} y2={y(v)} /><text x="2" y={y(v) + 4}>{v}</text></g>
      ))}
      <polyline fill="none" strokeWidth="2.5" points={vals.map((v, i) => x(i) + ',' + y(v)).join(' ')} />
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r="4" />
          <text x={x(i) - 8} y={y(v) - 9}>{v}</text>
          <text x={x(i) - 22} y={h - 6}>{TERMS[i]}</text>
        </g>
      ))}
    </svg>
  );
}

export const RemarkItem = ({ r, showName }) => {
  const { students } = useData();
  const name = students.find((s) => s.id === r.sid)?.name;
  return (
    <div className="rm">
      <b>{showName ? name + ' · ' : ''}{r.sub}</b><br />{r.text}<br />
      <small>{r.fac} · {r.date}</small>
    </div>
  );
};

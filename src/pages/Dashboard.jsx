import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData, useCurrentStudent } from '../context/DataContext.jsx';
import { avg, attAvg, attSt, perf } from '../utils/calc.js';
import { SUBJECTS } from '../data/seed.js';
import { LevelBar, LineChart, RemarkItem, StatCard } from '../components/ui.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const { students, remarks, grade } = useData();
  const s = useCurrentStudent();
  if (user.role === 'admin') {
    const all = students.reduce((x, t) => x + avg(t), 0) / students.length;
    const att = Math.round(students.reduce((x, t) => x + attAvg(t), 0) / students.length);
    return (
      <>
        <div className="grid g4">
          <StatCard label="Total students" value={students.length} note="Admin module" />
          <StatCard label="Average marks" value={all.toFixed(1) + '%'} note="Class average" />
          <StatCard label="Average attendance" value={att + '%'} note="Class average" />
          <StatCard label="Overall performance" value={perf(all)[0]} note="Class level" />
        </div>
        <div className="grid g2 mt">
          <div className="card"><h2>Performance overview</h2>
            {students.map((t) => (
              <div className="row" key={t.id} style={{ margin: '9px 0' }}>
                <span style={{ width: 110 }}>{t.name}</span><LevelBar p={Math.round(avg(t))} /><b>{Math.round(avg(t))}%</b>
              </div>))}
          </div>
          <div className="card"><h2>Recent remarks</h2>{remarks.slice(0, 3).map((r, i) => <RemarkItem key={i} r={r} showName />)}</div>
        </div>
        <div className="card mt"><h2>Quick access</h2>
          <div className="qa">
            <Link className="btn o" to="/students">Student records</Link><Link className="btn o" to="/marks">Enter marks</Link>
            <Link className="btn o" to="/attendance">Manage attendance</Link><Link className="btn o" to="/remarks">Add remarks</Link><Link className="btn o" to="/reports">Reports</Link>
          </div>
        </div>
      </>
    );
  }
  const a = Math.round(avg(s));
  return (
    <>
      <div className="card"><div className="dl">
        <div><span>Student</span>{s.name}</div><div><span>Student ID</span>{s.id}</div>
        <div><span>Department</span>{s.dept}</div><div><span>Year / Section</span>{s.year} / {s.sec}</div>
      </div></div>
      <div className="grid g4 mt">
        <StatCard label="Overall marks" value={a + '%'} note={'Grade ' + grade(a)} />
        <StatCard label="Attendance" value={attAvg(s) + '%'} note={attSt(attAvg(s))[0]} />
        <StatCard label="Overall performance" value={perf(a)[0]} note="Based on average marks" />
        <StatCard label="Subjects" value={SUBJECTS.length} note={s.dept + ' · Year ' + s.year} />
      </div>
      <div className="grid g2 mt">
        <div className="card"><h2>Performance trend</h2><LineChart vals={s.trend} /></div>
        <div className="card"><h2>Recent remarks</h2>
          {remarks.filter((r) => r.sid === s.id).slice(0, 3).map((r, i) => <RemarkItem key={i} r={r} />)}
        </div>
      </div>
      <div className="card mt"><h2>Quick access</h2>
        <div className="qa"><Link className="btn o" to="/marks">Marks</Link><Link className="btn o" to="/attendance">Attendance</Link><Link className="btn" to="/reports">View full report</Link></div>
      </div>
    </>
  );
}

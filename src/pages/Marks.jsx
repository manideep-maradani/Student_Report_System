import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData, useCurrentStudent } from '../context/DataContext.jsx';
import { avg, perf, tot } from '../utils/calc.js';
import { SUBJECTS } from '../data/seed.js';
import { Badge, LevelBar, StudentPicker } from '../components/ui.jsx';

function MarksTable({ s }) {
  const { user } = useAuth();
  const { grade, updateStudent } = useData();
  const admin = user.role === 'admin';
  const [rows, setRows] = useState(s.marks);
  const [saved, setSaved] = useState(false);
  const change = (i, c, max) => (e) => {
    const v = Math.max(0, Math.min(max, Number(e.target.value) || 0));
    setRows(rows.map((m, r) => (r === i ? m.map((x, k) => (k === c ? v : x)) : m)));
    setSaved(false);
  };
  const a = Math.round(rows.reduce((x, m) => x + tot(m), 0) / rows.length);
  return (
    <>
      <div className="card tw"><table>
        <thead><tr><th>Student</th><th>Subject</th><th>Internal (30)</th><th>Final (70)</th><th>Total (100)</th><th>Grade</th></tr></thead>
        <tbody>
          {SUBJECTS.map((n, i) => (
            <tr key={n}><td>{s.name}</td><td>{n}</td>
              <td>{admin ? <input type="number" min="0" max="30" aria-label={'Internal ' + n} value={rows[i][0]} onChange={change(i, 0, 30)} /> : rows[i][0]}</td>
              <td>{admin ? <input type="number" min="0" max="70" aria-label={'Final ' + n} value={rows[i][1]} onChange={change(i, 1, 70)} /> : rows[i][1]}</td>
              <td>{tot(rows[i])}</td><td><span className="bg ok">{grade(tot(rows[i]))}</span></td></tr>
          ))}
        </tbody>
      </table></div>
      <div className="grid g2 mt">
        <div className="card"><h3>Overall performance</h3><b style={{ fontSize: 24 }}>{a}% · Grade {grade(a)}</b> <Badge v={perf(a)} />
          <p className="note">Average of {SUBJECTS.length} subjects</p>
          {admin && <><button className="btn" data-save onClick={() => { updateStudent(s.id, { marks: rows }); setSaved(true); }}>Save marks</button> {saved && <span className="ok-msg">Saved</span>}</>}
        </div>
        <div className="card"><h3>Subject-wise performance</h3>
          {SUBJECTS.map((n, i) => (
            <div className="row" key={n} style={{ margin: '7px 0' }}><span style={{ width: 140, fontSize: 13 }}>{n}</span><LevelBar p={tot(rows[i])} /><b>{tot(rows[i])}</b></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Marks() {
  const s = useCurrentStudent();
  return <><StudentPicker /><MarksTable key={s.id} s={s} /></>;
}

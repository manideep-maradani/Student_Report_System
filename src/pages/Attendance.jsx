import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData, useCurrentStudent } from '../context/DataContext.jsx';
import { attP, attSt } from '../utils/calc.js';
import { SUBJECTS } from '../data/seed.js';
import { Badge, StudentPicker } from '../components/ui.jsx';

function AttTable({ s }) {
  const { user } = useAuth();
  const { updateStudent } = useData();
  const admin = user.role === 'admin';
  const [rows, setRows] = useState(s.att);
  const [saved, setSaved] = useState(false);
  const change = (i, c) => (e) => {
    const v = Math.max(0, Number(e.target.value) || 0);
    setRows(rows.map((a, r) => (r === i ? a.map((x, k) => (k === c ? v : x)) : a)));
    setSaved(false);
  };
  const overall = Math.round((rows.reduce((x, a) => x + a[1], 0) / rows.reduce((x, a) => x + a[0], 0)) * 100);
  const save = () => {
    updateStudent(s.id, { att: rows.map((a) => [a[0], Math.min(a[1], a[0])]) });
    setRows(rows.map((a) => [a[0], Math.min(a[1], a[0])]));
    setSaved(true);
  };
  return (
    <>
      <div className="card tw"><table>
        <thead><tr><th>Student</th><th>Subject</th><th>Total classes</th><th>Classes attended</th><th>Attendance</th><th>Status</th></tr></thead>
        <tbody>
          {SUBJECTS.map((n, i) => {
            const a = rows[i], p = attP(a);
            return (
              <tr key={n}><td>{s.name}</td><td>{n}</td>
                <td>{admin ? <input type="number" min="0" aria-label={'Total ' + n} value={a[0]} onChange={change(i, 0)} /> : a[0]}</td>
                <td>{admin ? <input type="number" min="0" aria-label={'Attended ' + n} value={a[1]} onChange={change(i, 1)} /> : a[1]}</td>
                <td>{a[1]} / {a[0]} = <b>{p}%</b></td><td><Badge v={attSt(p)} /></td></tr>
            );
          })}
        </tbody>
      </table></div>
      <div className="card mt sb">
        <div><h3>Overall attendance</h3><b style={{ fontSize: 24 }}>{overall}%</b> <Badge v={attSt(overall)} />
          <p className="note">Good: 85% and above · Average: 75-84% · Low: below 75%</p></div>
        {admin && <div><button className="btn" data-save onClick={save}>Save attendance</button> {saved && <span className="ok-msg">Saved</span>}</div>}
      </div>
    </>
  );
}

export default function Attendance() {
  const s = useCurrentStudent();
  return <><StudentPicker /><AttTable key={s.id} s={s} /></>;
}

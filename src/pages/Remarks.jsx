import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData, useCurrentStudent } from '../context/DataContext.jsx';
import { SUBJECTS } from '../data/seed.js';
import { RemarkItem } from '../components/ui.jsx';

export default function Remarks() {
  const { user } = useAuth();
  const { students, remarks, addRemark } = useData();
  const s = useCurrentStudent();
  const admin = user.role === 'admin';
  const [f, setF] = useState({ sid: students[0].id, sub: SUBJECTS[0], text: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    addRemark({ ...f, text: f.text.trim(), fac: user.name, date: new Date().toISOString().slice(0, 10) });
    setF({ ...f, text: '' });
  };
  const list = admin ? remarks : remarks.filter((r) => r.sid === s.id);
  return (
    <div className="grid g2">
      {admin && (
        <form className="card" onSubmit={submit} style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <h2>Add remark</h2>
          <div><label htmlFor="rs0">Student</label><select id="rs0" value={f.sid} onChange={set('sid')}>{students.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
          <div><label htmlFor="rs">Subject</label><select id="rs" value={f.sub} onChange={set('sub')}>{SUBJECTS.map((n) => <option key={n}>{n}</option>)}</select></div>
          <div><label htmlFor="rt">Remark</label><textarea id="rt" rows="4" maxLength="300" required value={f.text} onChange={set('text')} /></div>
          <button className="btn">Save remark</button>
        </form>
      )}
      <div className="card"><h2>{admin ? 'All remarks' : 'Remarks for ' + s.name}</h2>
        {list.map((r, i) => <RemarkItem key={i} r={r} showName={admin} />)}
        {!list.length && <p className="note">No remarks have been added yet.</p>}
      </div>
    </div>
  );
}

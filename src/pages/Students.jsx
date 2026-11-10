import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

// Small dialog for the Admin to edit a student's basic details.
function EditDialog({ s, onClose }) {
  const ref = useRef();
  const { updateStudent } = useData();
  const [f, setF] = useState({ name: s.name, dept: s.dept, year: s.year, sec: s.sec, email: s.email });
  useEffect(() => { ref.current.showModal(); }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = (e) => { e.preventDefault(); updateStudent(s.id, { ...f, year: Number(f.year) }); onClose(); };
  return (
    <dialog ref={ref} onClose={onClose} style={{ width: 'min(420px,92vw)' }}>
      <form onSubmit={save} style={{ display: 'grid', gap: 12 }}>
        <h2>Edit student</h2>
        {[['name', 'Name'], ['dept', 'Department'], ['year', 'Year'], ['sec', 'Section'], ['email', 'Email']].map(([k, l]) => (
          <div key={k}><label>{l}<input required value={f[k]} onChange={set(k)} /></label></div>))}
        <div className="row"><button className="btn">Save changes</button><button type="button" className="btn o" onClick={onClose}>Cancel</button></div>
      </form>
    </dialog>
  );
}

export default function Students() {
  const { user } = useAuth();
  const { students, pickStudent } = useData();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('');
  const [editing, setEditing] = useState(null);
  const admin = user.role === 'admin';
  const list = admin
    ? students.filter((s) => (!dept || s.dept === dept) && (s.name + s.id + s.email).toLowerCase().includes(q.toLowerCase()))
    : students.filter((s) => s.id === user.studentId);
  return (
    <>
      {admin && (
        <div className="ctl noprint" style={{ marginBottom: 14 }}>
          <input placeholder="Search by name, ID or email" aria-label="Search students" style={{ minWidth: 240 }} value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Filter by department" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">All departments</option>
            {[...new Set(students.map((s) => s.dept))].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      )}
      <div className="card tw"><table>
        <thead><tr><th>Student ID</th><th>Name</th><th>Department</th><th>Year</th><th>Section</th><th>Email</th><th>Action</th></tr></thead>
        <tbody>
          {list.map((s) => (
            <tr key={s.id}><td>{s.id}</td><td>{s.name}</td><td>{s.dept}</td><td>{s.year}</td><td>{s.sec}</td><td>{s.email}</td>
              <td>
                <button className="btn s o" onClick={() => { pickStudent(s.id); nav('/reports'); }}>View</button>{' '}
                {admin && <button className="btn s" data-edit onClick={() => setEditing(s)}>Edit</button>}
              </td></tr>
          ))}
          {!list.length && <tr><td colSpan="7">No students match.</td></tr>}
        </tbody>
      </table></div>
      {editing && <EditDialog s={editing} onClose={() => setEditing(null)} />}
    </>
  );
}

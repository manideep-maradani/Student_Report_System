import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_CODE, useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';

export default function Signup() {
  const { signup } = useAuth();
  const { students } = useData();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '', role: 'user', studentId: students[0].id, code: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const m = signup(f, students);
    if (m) setErr(m); else nav('/login', { state: { msg: 'Account created. Please log in.' } });
  };
  return (
    <div className="login">
      <div className="lside"><div className="logo">SR</div><h1>Create your account</h1><p>Admins manage academic records. Users view a student's report.</p></div>
      <div className="lform">
        <form onSubmit={submit}>
          <h2>Sign up</h2>
          <div><label htmlFor="n">Full name</label><input id="n" required value={f.name} onChange={set('name')} /></div>
          <div><label htmlFor="e">Email</label><input id="e" type="email" required value={f.email} onChange={set('email')} /></div>
          <div><label htmlFor="p">Password (min 6 characters)</label><input id="p" type="password" required value={f.password} onChange={set('password')} /></div>
          <div><label htmlFor="c">Confirm password</label><input id="c" type="password" required value={f.confirm} onChange={set('confirm')} /></div>
          <div><label htmlFor="r">Register as</label>
            <select id="r" value={f.role} onChange={set('role')}><option value="user">User (Student / Parent)</option><option value="admin">Admin (Faculty)</option></select></div>
          {f.role === 'user' ? (
            <div><label htmlFor="s">Student to view</label>
              <select id="s" value={f.studentId} onChange={set('studentId')}>{students.map((s) => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}</select></div>
          ) : (
            <div><label htmlFor="a">Admin access code</label><input id="a" value={f.code} onChange={set('code')} />
              <span className="note">Demo code: {ADMIN_CODE}</span></div>
          )}
          <div className="err" role="alert">{err}</div>
          <button className="btn">Create account</button>
          <div className="links"><span>Already registered?</span><Link to="/login">Back to login</Link></div>
        </form>
      </div>
    </div>
  );
}

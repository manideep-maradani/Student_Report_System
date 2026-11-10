import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const info = useLocation().state?.msg;
  const [f, setF] = useState({ email: '', password: '', role: 'admin' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const demo = (email, password, role) => setF({ email, password, role });
  const submit = (e) => {
    e.preventDefault();
    const m = login(f.email, f.password, f.role);
    if (m) setErr(m); else nav('/dashboard');
  };
  return (
    <div className="login">
      <div className="lside"><div className="logo">SR</div><h1>Student Report System</h1><p>Marks, attendance and faculty remarks in one place.</p></div>
      <div className="lform">
        <form onSubmit={submit}>
          <h2>Sign in</h2>
          {info && <div className="ok-msg">{info}</div>}
          <div><label htmlFor="em">Email</label><input id="em" type="email" required value={f.email} onChange={set('email')} /></div>
          <div><label htmlFor="pw">Password</label><input id="pw" type="password" required value={f.password} onChange={set('password')} /></div>
          <div><label htmlFor="rl">Role</label>
            <select id="rl" value={f.role} onChange={set('role')}><option value="admin">Admin</option><option value="user">User</option></select></div>
          <div className="err" role="alert">{err}</div>
          <button className="btn">Log in</button>
          <div className="links"><Link to="/forgot-password">Forgot password?</Link><Link to="/signup">Create an account</Link></div>
          <div className="demo"><b>Demo accounts</b> (click to fill)<br />
            <button type="button" onClick={() => demo('faculty@demo.edu', 'faculty123', 'admin')}>Admin</button>
            <button type="button" onClick={() => demo('mani@demo.edu', 'student123', 'user')}>User (Student)</button>
            <button type="button" onClick={() => demo('parent@demo.edu', 'parent123', 'user')}>User (Parent)</button></div>
        </form>
      </div>
    </div>
  );
}

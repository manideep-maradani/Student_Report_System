import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ email: '', pw: '', cf: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (f.pw !== f.cf) return setErr('Passwords do not match.');
    const m = resetPassword(f.email, f.pw);
    if (m) setErr(m); else nav('/login', { state: { msg: 'Password reset. Please log in with your new password.' } });
  };
  return (
    <div className="login">
      <div className="lside"><div className="logo">SR</div><h1>Reset your password</h1><p>Frontend demo: no email is sent.</p></div>
      <div className="lform">
        <form onSubmit={submit}>
          <h2>Forgot password</h2>
          <div><label htmlFor="e">Registered email</label><input id="e" type="email" required value={f.email} onChange={set('email')} /></div>
          <div><label htmlFor="p">New password</label><input id="p" type="password" required value={f.pw} onChange={set('pw')} /></div>
          <div><label htmlFor="c">Confirm new password</label><input id="c" type="password" required value={f.cf} onChange={set('cf')} /></div>
          <div className="err" role="alert">{err}</div>
          <button className="btn">Reset password</button>
          <div className="links"><Link to="/login">Back to login</Link></div>
        </form>
      </div>
    </div>
  );
}

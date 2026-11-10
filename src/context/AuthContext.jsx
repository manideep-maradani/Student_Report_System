import { createContext, useContext, useState } from 'react';

// Frontend demo authentication using localStorage only (no backend, not secure).
const Ctx = createContext();
export const ADMIN_CODE = 'ADMIN123';
const SEED = [
  { name: 'Prof. E. Sai Kumar', email: 'faculty@demo.edu', password: 'faculty123', role: 'admin' },
  { name: 'Mani Deep', email: 'mani@demo.edu', password: 'student123', role: 'user', studentId: 'STU1001' },
  { name: 'Parent of Mani Deep', email: 'parent@demo.edu', password: 'parent123', role: 'user', studentId: 'STU1001' },
];
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = read('srs_users', null);
    if (saved) return saved;
    localStorage.setItem('srs_users', JSON.stringify(SEED));
    return SEED;
  });
  const [email, setEmail] = useState(() => read('srs_session', null));
  const user = users.find((u) => u.email === email) || null;
  const saveUsers = (list) => { setUsers(list); localStorage.setItem('srs_users', JSON.stringify(list)); };

  // Each function returns an error message string, or null on success.
  const login = (em, pw, role) => {
    const u = users.find((x) => x.email === em.trim().toLowerCase() && x.password === pw && x.role === role);
    if (!u) return 'Invalid email, password or role.';
    localStorage.setItem('srs_session', JSON.stringify(u.email));
    setEmail(u.email);
    return null;
  };
  const logout = () => { localStorage.removeItem('srs_session'); setEmail(null); };
  const signup = (f, students) => {
    const em = f.email.trim().toLowerCase();
    if (!f.name.trim()) return 'Please enter your name.';
    if (users.some((u) => u.email === em)) return 'An account with this email already exists.';
    if (f.password.length < 6) return 'Password must be at least 6 characters.';
    if (f.password !== f.confirm) return 'Passwords do not match.';
    if (f.role === 'admin' && f.code !== ADMIN_CODE) return 'Invalid admin access code.';
    if (f.role === 'user' && !students.some((s) => s.id === f.studentId)) return 'Select a valid student ID.';
    const acct = { name: f.name.trim(), email: em, password: f.password, role: f.role };
    if (f.role === 'user') acct.studentId = f.studentId;
    saveUsers([...users, acct]);
    return null;
  };
  const resetPassword = (em, pw) => {
    const e = em.trim().toLowerCase();
    if (!users.some((u) => u.email === e)) return 'No account found for this email.';
    if (pw.length < 6) return 'Password must be at least 6 characters.';
    saveUsers(users.map((u) => (u.email === e ? { ...u, password: pw } : u)));
    return null;
  };
  return <Ctx.Provider value={{ user, users, login, logout, signup, resetPassword }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);

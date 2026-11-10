import { createContext, useContext, useState } from 'react';
import { GRADING, defaultData } from '../data/seed.js';
import { useAuth } from './AuthContext.jsx';

// Student, marks, attendance and remarks data kept in localStorage (replace with an API later).
const Ctx = createContext();
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };

export function DataProvider({ children }) {
  const [data, setData] = useState(() => read('srs_data', null) || defaultData());
  const [grading, setGrading] = useState(() => localStorage.getItem('srs_grading') || 'letter');
  const [sid, setSid] = useState(() => localStorage.getItem('srs_sid') || 'STU1001');
  const commit = (d) => { setData(d); localStorage.setItem('srs_data', JSON.stringify(d)); };
  const updateStudent = (id, patch) =>
    commit({ ...data, students: data.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) });
  const addRemark = (r) => commit({ ...data, remarks: [r, ...data.remarks] });
  const pickGrading = (g) => { setGrading(g); localStorage.setItem('srs_grading', g); };
  const pickStudent = (id) => { setSid(id); localStorage.setItem('srs_sid', id); };
  const grade = (p) => GRADING[grading].of(p);
  return (
    <Ctx.Provider value={{ ...data, grading, pickGrading, grade, sid, pickStudent, updateStudent, addRemark }}>
      {children}
    </Ctx.Provider>
  );
}
export const useData = () => useContext(Ctx);

// Admin sees the selected student; a User sees only the student linked to their account.
export function useCurrentStudent() {
  const { user } = useAuth();
  const { students, sid } = useData();
  return students.find((s) => s.id === (user.role === 'admin' ? sid : user.studentId));
}

import { useData, useCurrentStudent } from '../context/DataContext.jsx';
import { attAvg, attP, attSt, avg, perf, tot } from '../utils/calc.js';
import { GRADING, SUBJECTS } from '../data/seed.js';
import { Badge, LineChart, RemarkItem, StudentPicker } from '../components/ui.jsx';

export default function Reports() {
  const { remarks, grade, grading } = useData();
  const s = useCurrentStudent();
  const a = Math.round(avg(s));
  const mine = remarks.filter((r) => r.sid === s.id);
  return (
    <>
      <div className="ctl noprint" style={{ marginBottom: 14, justifyContent: 'space-between' }}>
        <StudentPicker /><button className="btn" onClick={() => window.print()}>Print Report</button>
      </div>
      <div className="card rep">
        <div className="hd"><div><h2>Student Report System</h2><span className="note">Consolidated academic report</span></div><div className="note">Grading: {GRADING[grading].label}</div></div>
        <section style={{ marginTop: 0 }}><h3>Student information</h3><div className="dl">
          <div><span>Name</span>{s.name}</div><div><span>Student ID</span>{s.id}</div><div><span>Department</span>{s.dept}</div>
          <div><span>Year</span>{s.year}</div><div><span>Section</span>{s.sec}</div></div></section>
        <section><h3>Academic performance</h3><div className="tw"><table>
          <thead><tr><th>Subject</th><th>Internal</th><th>Final</th><th>Total</th><th>Grade</th></tr></thead>
          <tbody>{SUBJECTS.map((n, i) => <tr key={n}><td>{n}</td><td>{s.marks[i][0]}</td><td>{s.marks[i][1]}</td><td>{tot(s.marks[i])}/100</td><td>{grade(tot(s.marks[i]))}</td></tr>)}</tbody>
        </table></div><p><b>Overall marks: {a}% · Overall grade: {grade(a)}</b></p></section>
        <section><h3>Attendance</h3><div className="tw"><table>
          <thead><tr><th>Subject</th><th>Attended / Total</th><th>Status</th></tr></thead>
          <tbody>{SUBJECTS.map((n, i) => <tr key={n}><td>{n}</td><td>{s.att[i][1]} / {s.att[i][0]} = {attP(s.att[i])}%</td><td><Badge v={attSt(attP(s.att[i]))} /></td></tr>)}</tbody>
        </table></div><p><b>Overall attendance: {attAvg(s)}%</b></p></section>
        <section><h3>Faculty remarks</h3>{mine.map((r, i) => <RemarkItem key={i} r={r} />)}{!mine.length && <p className="note">No remarks recorded.</p>}</section>
        <section><h3>Performance</h3><LineChart vals={s.trend} /><div className="dl">
          <div><span>Average marks</span><b>{a}%</b></div><div><span>Overall grade</span><b>{grade(a)}</b></div>
          <div><span>Attendance</span><b>{attAvg(s)}%</b></div><div><span>Standing</span><Badge v={perf(a)} /></div></div></section>
      </div>
    </>
  );
}

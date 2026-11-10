// Calculation helpers shared by all pages.
export const tot = (m) => m[0] + m[1];
export const avg = (s) => s.marks.reduce((a, m) => a + tot(m), 0) / s.marks.length;
export const attP = (a) => (a[0] ? Math.round((a[1] / a[0]) * 100) : 0);
export const attAvg = (s) =>
  Math.round((s.att.reduce((a, x) => a + x[1], 0) / s.att.reduce((a, x) => a + x[0], 0)) * 100);
export const perf = (p) => (p >= 80 ? ['Excellent', 'ok'] : p >= 60 ? ['Good', 'ok'] : ['Needs attention', 'bd']);
export const attSt = (p) => (p >= 85 ? ['Good', 'ok'] : p >= 75 ? ['Average', 'wn'] : ['Low', 'bd']);

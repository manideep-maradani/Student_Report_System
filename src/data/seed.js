// Sample data only (fictional). Replace with API/database calls when a backend is added.
export const SUBJECTS=['Mathematics','Operating System','Front End Development and Frame Works for Web Applications','AIML','Computer Networks'];
export const TERMS=['InSem 1','InSem 2','Lab Internal','EndSem'];
// Add another grading format by adding one entry here.
export const GRADING={
 letter:{label:'Letter grades (A-F)',of:p=>p>=90?'A+':p>=80?'A':p>=70?'B':p>=60?'C':p>=50?'D':'F'},
 point10:{label:'10-point scale',of:p=>p>=90?'10':p>=80?'9':p>=70?'8':p>=60?'7':p>=50?'6':p>=40?'5':'0'}};
export function defaultData(){return{
students:[
{id:'STU1001',name:'Mani Deep',dept:'CSE',year:2,sec:'A',email:'mani.deep@example.edu',marks:[[24,58],[26,61],[27,64],[22,55],[25,60]],att:[[50,45],[48,43],[50,47],[45,38],[50,44]],trend:[68,72,76,81]},
{id:'STU1002',name:'Deepak',dept:'CSE',year:3,sec:'A',email:'deepak@example.edu',marks:[[20,44],[22,48],[21,50],[18,40],[20,45]],att:[[50,36],[48,34],[50,39],[45,31],[50,37]],trend:[60,63,61,66]},
{id:'STU1003',name:'Uma Ganesh',dept:'IT',year:2,sec:'B',email:'uma.ganesh@example.edu',marks:[[26,60],[25,58],[27,63],[24,57],[26,61]],att:[[50,47],[48,44],[50,46],[45,41],[50,45]],trend:[74,77,79,82]},
{id:'STU1004',name:'Ibrahim',dept:'CSE',year:4,sec:'B',email:'ibrahim.rasool@example.edu',marks:[[28,66],[27,62],[29,67],[26,60],[28,64]],att:[[50,49],[48,46],[50,49],[45,43],[50,48]],trend:[80,84,88,91]},
{id:'STU1005',name:'Priya Singh',dept:'ECE',year:2,sec:'A',email:'priya.singh@example.edu',marks:[[18,40],[20,44],[21,48],[17,36],[19,41]],att:[[50,33],[48,31],[50,38],[45,30],[50,34]],trend:[62,58,55,51]}],
remarks:[
{sid:'STU1001',sub:'Front End Development and Frame Works for Web Applications',fac:'Prof. E. SaiKumar ',date:'2025-09-12',text:'Strong project work. Keep revising layout fundamentals.'},
{sid:'STU1001',sub:'Mathematics',fac:'Prof. L. Ebinezer',date:'2025-09-20',text:'Needs more practice with joins and normalization.'},
{sid:'STU1002',sub:'Artificial Intelligence',fac:'Dr. A. Joe Nithin ',date:'2025-09-15',text:'Improving steadily. Attend the extra problem sessions.'},
{sid:'STU1004',sub:'Operating System',fac:'Dr. A. Bhagya Lakshmi',date:'2025-09-18',text:'Excellent problem solving. Consistent improvement.'},
{sid:'STU1005',sub:'Computer Networks',fac:'Dr. K. Uday Kiran',date:'2025-09-22',text:'Low attendance is affecting results. Please meet the faculty.'}]};}

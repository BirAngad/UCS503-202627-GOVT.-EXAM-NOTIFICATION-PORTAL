const crypto = require('node:crypto');
const hash = (password, salt) => crypto.scryptSync(password, salt, 64).toString('hex');
const digest = token => crypto.createHash('sha256').update(token).digest('hex');
module.exports = (app, db) => {
  db.pragma('foreign_keys = ON');
  db.exec(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, salt TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('user','admin')), alerts INTEGER NOT NULL DEFAULT 1);
  CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS reminders(user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, exam_id INTEGER NOT NULL REFERENCES exams(id) ON DELETE CASCADE, PRIMARY KEY(user_id, exam_id));`);
  const publicUser = u => ({id:u.id,name:u.name,email:u.email,role:u.role,alerts:!!u.alerts});
  const fail = (res,status,message) => res.status(status).json({success:false,message});
  const createUser = (name,email,password,role='user') => { const salt=crypto.randomBytes(16).toString('hex'); return db.prepare('INSERT INTO users(name,email,password_hash,salt,role) VALUES(?,?,?,?,?)').run(name,email,hash(password,salt),salt,role); };
  if(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && !db.prepare('SELECT id FROM users WHERE email=?').get(process.env.ADMIN_EMAIL.toLowerCase())) {
    if(process.env.ADMIN_PASSWORD.length<12) throw Error('ADMIN_PASSWORD must be at least 12 characters');
    createUser('Administrator',process.env.ADMIN_EMAIL.toLowerCase(),process.env.ADMIN_PASSWORD,'admin');
  }
  function auth(req,res,next){const token=req.headers.authorization?.match(/^Bearer ([a-f0-9]{64})$/)?.[1]; if(!token)return fail(res,401,'Please sign in'); const user=db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE token_hash=? AND expires>?').get(digest(token),Date.now()); if(!user)return fail(res,401,'Session expired. Sign in again.'); req.user=user;req.token=token;next();}
  function admin(req,res,next){if(req.user.role!=='admin')return fail(res,403,'Administrator access required');next();}
  function session(res,user,status=200){const token=crypto.randomBytes(32).toString('hex');db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(digest(token),user.id,Date.now()+7*86400000);res.status(status).json({success:true,data:{token,user:publicUser(user)}});}
  app.post('/api/auth/register',(req,res)=>{const {name,email,password}=req.body||{};if(typeof name!=='string'||!name.trim()||name.length>100||typeof email!=='string'||email.length>254||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<8||password.length>128)return fail(res,400,'Enter a name, valid email and password of 8–128 characters');const e=email.trim().toLowerCase();if(db.prepare('SELECT id FROM users WHERE email=?').get(e))return fail(res,409,'Email already registered');const r=createUser(name.trim(),e,password);session(res,db.prepare('SELECT * FROM users WHERE id=?').get(r.lastInsertRowid),201);});
  app.post('/api/auth/login',(req,res)=>{const {email,password}=req.body||{};if(typeof email!=='string'||typeof password!=='string'||password.length>128)return fail(res,400,'Invalid credentials');const u=db.prepare('SELECT * FROM users WHERE email=?').get(email.trim().toLowerCase());if(!u||!crypto.timingSafeEqual(Buffer.from(hash(password,u.salt),'hex'),Buffer.from(u.password_hash,'hex')))return fail(res,401,'Invalid email or password');session(res,u);});
  app.post('/api/auth/logout',auth,(req,res)=>{db.prepare('DELETE FROM sessions WHERE token_hash=?').run(digest(req.token));res.json({success:true});});
  app.get('/api/profile',auth,(req,res)=>res.json({success:true,data:publicUser(req.user)}));
  app.put('/api/profile',auth,(req,res)=>{const {name,alerts}=req.body||{};if(typeof name!=='string'||!name.trim()||name.length>100||typeof alerts!=='boolean')return fail(res,400,'Invalid profile');db.prepare('UPDATE users SET name=?, alerts=? WHERE id=?').run(name.trim(),Number(alerts),req.user.id);res.json({success:true,data:publicUser(db.prepare('SELECT * FROM users WHERE id=?').get(req.user.id))});});
  app.get('/api/reminders',auth,(req,res)=>res.json({success:true,data:db.prepare('SELECT exam_id FROM reminders WHERE user_id=?').all(req.user.id).map(r=>String(r.exam_id))}));
  app.put('/api/reminders/:id',auth,(req,res)=>{const id=Number(req.params.id);if(!Number.isSafeInteger(id)||!db.prepare('SELECT id FROM exams WHERE id=?').get(id))return fail(res,404,'Exam not found');db.prepare('INSERT OR IGNORE INTO reminders VALUES(?,?)').run(req.user.id,id);res.json({success:true});});
  app.delete('/api/reminders/:id',auth,(req,res)=>{db.prepare('DELETE FROM reminders WHERE user_id=? AND exam_id=?').run(req.user.id,Number(req.params.id));res.json({success:true});});
  return {auth,admin};
};

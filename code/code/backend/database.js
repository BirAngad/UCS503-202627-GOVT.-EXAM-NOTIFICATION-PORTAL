// Node 22.13+ includes SQLite, avoiding platform-specific native npm builds.
const { DatabaseSync } = require('node:sqlite');
module.exports = class Database extends DatabaseSync {
  pragma(value) { this.exec('PRAGMA ' + value); }
  transaction(fn) { return (...args) => { this.exec('BEGIN'); try { const result=fn(...args); this.exec('COMMIT'); return result; } catch(error) { this.exec('ROLLBACK'); throw error; } }; }
};

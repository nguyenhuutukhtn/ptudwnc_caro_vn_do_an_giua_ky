var db = require('../utils/db');

module.exports = {
  getByUsername: username => {
    return db.load(`select * from USERS where username = '${username}'`);
  },
  add: (username, email, password) => {
    return db.load(
      `insert into USERS(username, email, hashPassword) value ('${username}','${email}','${password}')`
    );
  }
};

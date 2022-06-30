//
// File: data-access.js
// Date: 6/30/2022
// Desc: CommonJS module that contains our data access code.
//

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Ihgdp51505150!",
  database: "stu0",
  host: "localhost",
  port: 5432,
});

exports.getPerson = async (personId) => {
    let retval = null;
    try {
        // TODO ...
    } catch (err) {
        console.error(err);
    }
    return retval;
}

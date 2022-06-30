//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

const { Pool } = require("pg");

const SELECT_PERSON = "select * from person where person_id = $1";

const pool = new Pool({
  user: "postgres",
  password: "Ihgdp51505150!",
  database: "express",
  host: "localhost",
  port: 5432,
});

//
// GET Person
//

exports.getPerson = async (personId) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_PERSON, [personId]);
        retval = r.rows[0];
    } catch (err) {
        console.error(err);
    }
    return retval;
}

//
// main
//

const main = async () => {
    let p = await getPerson(1);
    console.log(p)
}

//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

const { Pool } = require("pg");

const SELECT_PERSONS = "select * from person";
const SELECT_PERSON = "select * from person where person_id = $1";
const SELECT_PERSONS_FOR_TYPE = `
    select * from person p
        join person_type pt on p.person_type_id = pt.person_type_id
    where 
        person_type = $1`;

const pool = new Pool({
  user: "postgres",
  password: "Ihgdp51505150!",
  database: "stu0",
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

exports.getPersons = async () => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_PERSONS);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getPersonsForType = async (personType) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_PERSONS_FOR_TYPE, [personType]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

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
const SELECT_BOOKS = "select * from book";
const SELECT_BOOK = "select * from book where book_id = $1";
const SELECT_PERSON_AT_BOOKSTORE = `
    select 
        p.person_id, 
        p.first_name,
        p.last_name, 
        pt.person_type
    from person p
        join book_store bs on p.book_store_id = bs.book_store_id
        join person_type pt on p.person_type_id = pt.person_type_id
    where p.book_store_id = $1`

const INSERT_PERSON = "insert into person (person_type_id, book_store_id, first_name, last_name, dob) values ($1, $2, $3, $4, $5) returning person_id";
const INSERT_BOOKSTORE = "insert into book_store (book_store_name) values ($1) returning book_store_id";
const UPDATE_PERSON = "update person set first_name = $1, last_name = $2 where person_id = $3"
const DELETE_PERSON = "delete from person where person_id = $1"

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

exports.getBooks = async () => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_BOOKS);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getBook = async (userId) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_BOOK, [userId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getPeopleAtBookstore = async (bookStoreId) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_PERSON_AT_BOOKSTORE, [bookStoreId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.addPerson = async (person) => {
    let retval = null;
    try {
        let r = await pool.query(INSERT_PERSON, [person.personTypeId, person.bookstoreId, person.firstName, person.lastName, person.dob]);
        retval = r.rows[0].person_id;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.addBookstore = async (bookname) => {
    let retval = null;
    try {
        let r = await pool.query(INSERT_BOOKSTORE, [bookname]);
        retval = r.rows[0].book_store_id;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.updatePerson = async (personId, firstName, lastName) => {
    let retval = null;
    try {
        await pool.query(UPDATE_PERSON, [firstName, lastName, personId]);
        retval = await this.getPerson(personId)
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.deletePerson = async (personId) => {
    let retval = null;
    try {
        await pool.query(DELETE_PERSON, [personId]);
        retval = "OK"
    } catch (err) {
        console.error(err);
    }
    return retval;
}

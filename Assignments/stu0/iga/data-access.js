//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

const { Pool } = require("pg");

const SELECT_BOOKS_FOR_BOOKSTORE = `
    select 
        b.book_id,
        b.title,
        b.isbn
    from book_store bs
        join book_store_book bsb on bs.book_store_id = bsb.book_store_id
        join book b on b.book_id = bsb.book_id
    where bs.book_store_id = $1`

const pool = new Pool({
  user: "postgres",
  password: "Ihgdp51505150!",
  database: "stu0",
  host: "localhost",
  port: 5432,
});

//
// GET Books for bookstore
//

exports.getBooksForBookstore = async (bookstoreId) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_BOOKS_FOR_BOOKSTORE, [bookstoreId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

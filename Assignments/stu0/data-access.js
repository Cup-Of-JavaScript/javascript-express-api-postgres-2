//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");

const SELECT_ACCOUNT_TYPES = "select * from account_type;";
const SELECT_TRANSACTION_TYPES = "select * from transaction_type;"
const SELECT_USERS_DOB_FILTER = "select * from bank_user where dob > $1";

module.exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_ACCOUNT_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_TRANSACTION_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getUsersDobFilter = async (filterYear) => {
    let retval = null;
    filterYear = "1/1/" + filterYear
    try {
        let r = await pool.query(SELECT_USERS_DOB_FILTER, [filterYear]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}



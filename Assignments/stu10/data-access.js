//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const GET_ACCOUNT_TYPES = "Select * from account_type;"
const GET_TRANSACTION_TYPES = "Select * from transaction_type;"
const GET_USER_BY_YEAR = "Select * from bank_user where extract(YEAR from dob) > 1970"

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

module.exports.getUserByYear = async (dobFilterYear)  => {
    let retval = null;
    try {
        let r = await pool.query(GET_USER_BY_YEAR, [dobFilterYear]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
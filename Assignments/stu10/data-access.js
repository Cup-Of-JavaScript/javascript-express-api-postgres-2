//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const GET_ACCOUNT_TYPES = "Select * from account_type;"
const GET_TRANSACTION_TYPES = "Select * from transaction_type;"

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

module.exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
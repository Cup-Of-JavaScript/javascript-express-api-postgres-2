//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const GET_ACCOUNT_TYPE = `select * from account_type`

const GET_TRANSACTION_TYPE = `select * from transaction_type`



const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

exports.getAccountTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT_TYPE);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_TYPE);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
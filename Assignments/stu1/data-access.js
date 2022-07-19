//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../stu1/postgres-pool");
const currencyFormatter = require('currency-formatter');
const GET_ACCOUNTTYPES = "select * from account_type;"
const GET_TRANSACTIONTYPES = "select * from transaction_type;"
const GET_USERS = "select * from bank_user where extract(YEAR from dob) > $1;"
const GET_USERACCOUNTS = "select a.account_id, aa.account_name from account a join account_type aa on a.account_id = aa.account_type_id where a.bank_user_id = $1"
const GET_TRANSACTIONDATERANGE = "select * from transaction where transaction_date between $1 and $2 order by transaction_date asc"


module.exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNTTYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTIONTYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getUsers = async (year) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USERS, [year]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getUserAccounts = async (bankUserId) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USERACCOUNTS, [bankUserId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactionDateRange = async (startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTIONDATERANGE, [startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
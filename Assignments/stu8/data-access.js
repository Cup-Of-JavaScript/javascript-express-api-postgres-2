//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const GET_ACCOUNT_TYPE = `select * from account_type`

const GET_TRANSACTION_TYPE = `select * from transaction_type`

const GET_USER_BY_DOB = `select * from bank_user where extract(YEAR from dob) > $1`

const GET_USER_ACCOUNTS    =`select a.account_id,
    at.account_name
    from account a 
    join account_type at on at.account_type_id = a.account_type_id
    where bank_user_id = $1`

const TRANSACTION_DATE_RANGE = `select * from transaction where transaction_date >= $1 and transaction_date <= $2`

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

exports.getUsersByDob = async (dobFilterYear) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USER_BY_DOB, [dobFilterYear]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getUserAccounts = async (userId) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USER_ACCOUNTS, [userId]);
        retval = r.rows;
    } catch (err) { 
        console.error(err);
    }
    return retval;
}

exports.getTxnDateRange = async (startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(TRANSACTION_DATE_RANGE, [startDate,endDate]);
        retval = r.rows;
    } catch (err) { 
        console.error(err);
    }
    return retval;
}
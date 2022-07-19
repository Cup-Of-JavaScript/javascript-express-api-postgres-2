const GET_ACCOUNT_TYPES = 'select * from account_type'
const GET_TRANSACTION_TYPES = 'select * from transaction_type'
const GET_USERS_BY_DOB = 'select * from bank_user where extract(year from dob) > $1'
const GET_ACCOUNTS_BY_USER_ID = 'select a.account_id, aty.account_name from account as a join account_type as aty on a.account_type_id = aty.account_type_id where a.bank_user_id = $1'

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

// EX 1

exports.getAccountTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT_TYPES)
        retval = r.rows
    } catch (err) {
        console.error(err);
    }
    return retval;
}


// EX 2

exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_TYPES)
        retval = r.rows
    } catch (err) {
        console.error(err);
    }
    return retval;
}


// EX 3

exports.getUsersByDob = async (year) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USERS_BY_DOB, [year])
        retval = r.rows
    } catch (err) {
        console.error(err);
    }
    return retval;
}


// EX 4

exports.getAccountsByUserId = async (bankUserId) => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNTS_BY_USER_ID, [bankUserId])
        retval = r.rows
    } catch (err) {
        console.error(err);
    }
    return retval;
}
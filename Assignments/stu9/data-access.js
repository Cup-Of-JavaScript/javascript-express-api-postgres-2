//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

//const GET_ACCOUNT_TYPES = 'select * from account_type'
//const GET_TRANSACTION_TYPES = `select * from transaction_type`
//GET_USERS = `select * from bank_user where extract(YEAR from dob) > $1`
//const GET_ACCOUNT = `Select a.account_id, at.account_name from account a 
const TRANSACTION_DATE = 'select * from transaction where transaction_date between $1 and $2 order by transaction_date asc'
exports.getAccountTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
exports.getUsers = async (dobFilterYear) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USERS,[dobFilterYear]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

exports.getAccount = async (userId)  => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT, [userId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
exports.getDates = async (startDate, endDate) => {
    let retval = null;
    try {
       let r = await pool.query (TRANSACTION_DATE,[startDate, endDate]) 
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

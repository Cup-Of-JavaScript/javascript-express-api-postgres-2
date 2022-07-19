//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const GET_ACCOUNT_TYPES = 'select * from account_type'
const GET_TRANSACTION_TYPES = 'select * from transaction_type'
const GET_USERS = 'select * from bank_user bu where extract(YEAR from dob)  > $1'
const GET_ACCOUNTS =
`select 
a.account_id, 
at.account_name 
from account a
join bank_user bu on bu.bank_user_id = a.bank_user_id
join account_type at on at.account_type_id=a.account_type_id
where a.bank_user_id = $1`
const GET_TRANSACTIONS = 
`select * from transaction 
where transaction_date between $1 and $2 
order by transaction_date asc;`



module.exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT_TYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

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

module.exports.getUsers = async (dob) => {
    let retval = null;
    try {
        let r = await pool.query(GET_USERS, [dob]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getAccounts = async (bankUserId) => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNTS, [bankUserId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactions = async (startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTIONS, [startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
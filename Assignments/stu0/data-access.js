//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");

const SELECT_ACCOUNT_TYPES = "select * from account_type;";
const SELECT_TRANSACTION_TYPES = "select * from transaction_type;"
const SELECT_USERS_DOB_FILTER = "select * from bank_user where dob > $1";
const SELECT_ACCOUNTS_FOR_USER = `
    select 
        account_id, account_name
    from 
        account a
        join bank_user bu on a.bank_user_id = bu.bank_user_id
        join account_type at on a.account_type_id = at.account_type_id
    where 
        bu.bank_user_id = $1`
const SELECT_TRANSACTIONS_FOR_DATE_RANGE = `select * from transaction where transaction_date between $1 and $2;`
    

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

module.exports.getAccountsForUser = async (userId) => {
    try {
        let r = await pool.query(SELECT_ACCOUNTS_FOR_USER, [userId]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactionsForDateRange = async (startDate, endDate) => {
    try {
        let r = await pool.query(SELECT_TRANSACTIONS_FOR_DATE_RANGE, [startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

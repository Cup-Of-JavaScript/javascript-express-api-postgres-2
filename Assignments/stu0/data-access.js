//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

"use strict";

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
const SELECT_TRANSACTIONS_FOR_DATE_RANGE = `select * from transaction where transaction_date between $1 and $2 order by transaction_date;`
    
const SELECT_SUM_DEPOSITS_FOR_ACCOUNT = `select sum(dollar_amount) as total_deposit from view_transactions where account_id = $1 and transaction_type_id = 1`
const SELECT_SUM_WITHDRAWLS_FOR_ACCOUNT = `select sum(dollar_amount) as total_withdrawl from view_transactions where account_id = $1 and transaction_type_id = 2`

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
    let retval = null;
    try {
        let r = await pool.query(SELECT_ACCOUNTS_FOR_USER, [userId])
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getTransactionsForDateRange = async (startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(SELECT_TRANSACTIONS_FOR_DATE_RANGE, [startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}

module.exports.getAccountBalanceForAccountId = async (accountId) => {
    let retval = null;
    try {
        await pool.query("BEGIN")
        let depositResult = await pool.query(SELECT_SUM_DEPOSITS_FOR_ACCOUNT, [accountId])
        let sumDeposit = depositResult.rows[0].total_deposit
        let withDrawResult = await pool.query(SELECT_SUM_WITHDRAWLS_FOR_ACCOUNT, [accountId])
        let sumWithdrawl = withDrawResult.rows[0].total_withdrawl
        retval = sumDeposit - sumWithdrawl
        await pool.query("COMMIT")
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}


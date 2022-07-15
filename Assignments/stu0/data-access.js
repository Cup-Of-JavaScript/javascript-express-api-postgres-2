//
// File: data-access.js
// Date: 6/25/2022
// Desc: CommonJS module that contains our data access code.
//

"use strict";

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

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
const SELECT_SUM_DEPOSITS_FOR_ACCOUNT = `
    select 
        sum(dollar_amount) as total_deposit, account_name
    from 
        view_transactions 
    where 
        account_id = $1 and transaction_type_id = 1 
    group by 
        account_name`
const SELECT_SUM_WITHDRAWLS_FOR_ACCOUNT = `
    select 
        sum(dollar_amount) as total_withdrawl, account_name
    from 
        view_transactions 
    where 
        account_id = $1 and transaction_type_id = 2
    group by 
        account_name`

const SELECT_ACCOUNT_TRANSACTIONS_FOR_DATE_RANGE = `
    select 
        transaction_id, dollar_amount, transaction_date, the_type
    from 
        view_transactions 
    where 
        account_id = $1 and transaction_date between $2 and $3
    order by 
        transaction_date
    `

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
    let retval = { 
        balance: 0, 
        account: ""
    }
    try {
        await pool.query("BEGIN")
        const depositResult = await pool.query(SELECT_SUM_DEPOSITS_FOR_ACCOUNT, [accountId])
        const sumDeposit = depositResult.rows[0].total_deposit
        const withDrawResult = await pool.query(SELECT_SUM_WITHDRAWLS_FOR_ACCOUNT, [accountId])
        const sumWithdrawl = withDrawResult.rows[0].total_withdrawl
        const balance = sumDeposit - sumWithdrawl
        retval.balance = currencyFormatter.format(balance, { code: 'USD' });
        retval.account = withDrawResult.rows[0].account_name
        await pool.query("COMMIT")
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}

module.exports.getAccountTransactionsForDateRange = async (accountId, startDate, endDate) => {
    let retval = null;
    try {
        const r = await pool.query(SELECT_ACCOUNT_TRANSACTIONS_FOR_DATE_RANGE, [accountId, startDate, endDate])
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}


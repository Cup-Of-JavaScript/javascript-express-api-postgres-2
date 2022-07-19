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

const GET_ACCOUNT_NAME = `select account_name from view_transactions where account_id = $1`

const GET_DEPOSITS = `select sum(dollar_amount) as total_deposit from view_transactions where account_id = $1 and the_type = 'deposit' `

const GET_WITHDRAWALS = `select sum(dollar_amount) as total_withdrawl from view_transactions where account_id = $1 and the_type = 'withdraw'`

const GET_TRANSACTION_DATE_RANGE_BY_USER = `select * from view_transactions where bank_user_id = $1 and transaction_date >= $2 and transaction_date <= $3 order by transaction_date asc`

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

exports.getBalance = async (accountId) => {
    let retval = { 
        balance: 0, 
        account: ""
    }
    try {
        await pool.query("BEGIN")
        
        // Get account name.
        const accountNameRow = await pool.query(GET_ACCOUNT_NAME, [accountId]);
        retval.account = accountNameRow.rows[0].account_name;
        
        // Determine total deposits.
        const depositResult = await pool.query(GET_DEPOSITS, [accountId])
        const sumDeposit = (depositResult.rows[0]) ? depositResult.rows[0].total_deposit : 0 // Inline if statement.
        

        // Determine total withdrawls.
        const withDrawResult = await pool.query(GET_WITHDRAWALS,[accountId])
        const sumWithdrawl = (withDrawResult.rows[0]) ? withDrawResult.rows[0].total_withdrawl : 0  // Inline if statement.
        const balance = sumDeposit - sumWithdrawl
        

        // Format results.
        retval.balance = currencyFormatter.format(balance, { code: 'USD' });
        await pool.query("COMMIT")
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}

exports.getTxnDateRangeByUser = async (userId, startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_DATE_RANGE_BY_USER, [userId, startDate,endDate]);
        retval = r.rows;
    } catch (err) { 
        console.error(err);
    }
    return retval;
}
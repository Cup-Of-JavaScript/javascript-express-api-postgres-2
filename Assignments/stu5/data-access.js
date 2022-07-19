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
const GET_ACCOUNT_NAME = ' select account_name from view_transactions where account_id=$1 '
const GET_ACCOUNT_TYPE_DEPOSIT = 
`select sum(dollar_amount) 
as total_deposit 
from view_transactions 
where account_id = $1 
and the_type = 'deposit'`
const GET_ACCOUNT_TYPE_WITHDRAWAL =
 `select sum(dollar_amount) 
 as total_withdrawal 
 from view_transactions 
 where account_id = $1 
 and the_type = 'withdraw' `
 const GET_TRANSACTIONS_FOR_ACCOUNT = 
 `select 
 transaction_id,
 dollar_amount,
 transaction_date,
 the_type
 from view_transactions 
 where transaction_date between $2 and $3 
 and account_id = $1 
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

module.exports.getAccountBalance = async (accountId) => {
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
         const depositResult = await pool.query(GET_ACCOUNT_TYPE_DEPOSIT, [accountId]);
         const sumDeposit = (depositResult.rows[0]) ? depositResult.rows[0].total_deposit : 0 
         //console.log(sumDeposit)

         // Determine total withdrawls.
        const withDrawResult = await pool.query (GET_ACCOUNT_TYPE_WITHDRAWAL, [accountId]);
        const sumWithdrawl = (withDrawResult.rows[0]) ? withDrawResult.rows[0].total_withdrawal : 0 
        const balance = sumDeposit - sumWithdrawl
        console.log(sumWithdrawl)

         // Format results.
         retval.balance = currencyFormatter.format(balance, { code: 'USD' });
         await pool.query("COMMIT")
 
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}


module.exports.getTransactionsForAccount = async (accountId, startDate, endDate) => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTIONS_FOR_ACCOUNT, [accountId, startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
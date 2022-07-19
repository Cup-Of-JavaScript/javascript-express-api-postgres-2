//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool.js");
const currencyFormatter = require('currency-formatter');

//ex. 1
const Get_AccountType = 'SELECT * FROM account_type;'

exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(Get_AccountType);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}


//ex. 2
const Get_TransactionType = 'SELECT * FROM transaction_type;'

exports.getTransactionTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(Get_TransactionType);
        retval = r.rows;
    } catch (e) {
        console.error(e);
    }
    return retval;
}

//ex. 3
const Get_Users = 'SELECT * FROM bank_user WHERE EXTRACT( YEAR FROM dob) > $1;'

exports.getUser = async (dob_year) => {
    let retval = null;
    try {
        let r = await pool.query(Get_Users, [dob_year]);
        retval = r.rows;
    } catch (e) {
        console.error(e);
    }
    return retval;
}

//ex. 4
const Get_Account = 'SELECT at.account_name, a.account_id FROM account_type at JOIN account a ON a.account_type_id = at.account_type_id WHERE a.bank_user_id = $1;'

exports.getAccounts = async (userId) => {
    let retval = null;
    try {
        let r = await pool.query(Get_Account, [userId]);
        retval = r.rows;
    } catch (e) {
        console.error(e);
    }
    return retval;
}

//ex. 5
const Get_Transaction = 'SELECT * FROM transaction WHERE transaction_date BETWEEN $1 AND $2 ORDER BY transaction_date'

exports.getTransactions = async (dateOne, dateTwo) => {
    let retval = null;
    try {
        let r = await pool.query(Get_Transaction, [dateOne, dateTwo]);
        retval = r.rows;
    } catch (e) {
        console.error(e);
    }
    return retval;
}

//ex. 6
const Get_Balance = 'SELECT * FROM transaction WHERE transaction_date BETWEEN $1 AND $2 ORDER BY transaction_date'

exports.getAccountBalances = async () => {
    let retval = null;
    try {
        let r = await pool.query(Get_Balance);
        retval = r.rows;
    } catch (e) {
        console.error(e);
    }
    return retval;
}
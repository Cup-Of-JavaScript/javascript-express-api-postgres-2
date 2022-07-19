//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const GET_ACCOUNT_TYPES = "Select * from account_type;"
const GET_TRANSACTION_TYPES = "Select * from transaction_type;"
const GET_USER_BY_YEAR = "Select * from bank_user where extract(YEAR from dob) > 1970"
const GET_USER_ACCOUNT = `Select a.account_id, at.account_name from account a 
join account_type at on at.account_type_id = a.account_type_id where bank_user_id = $1`
const GET_TRANSACTION_DATES = `Select * from transaction where transaction_date > = $1 and transaction_date > = $2`

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

exports.getTransactionDates = async (startDate, endDate)  => {
    let retval = null;
    try {
        let r = await pool.query(GET_TRANSACTION_DATES, [startDate, endDate]);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
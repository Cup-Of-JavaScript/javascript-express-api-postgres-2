//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");
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
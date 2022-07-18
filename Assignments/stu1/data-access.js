//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../stu1/postgres-pool");
const currencyFormatter = require('currency-formatter');
const GET_ACCOUNTTYPES = "select * from account_type;"

module.exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNTTYPES);
        retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const account_type = 'select * from account_type'

exports.getAccountTypes = async () => {
    let retval = null;
    try {
       let r = await pool.query(account_type);
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
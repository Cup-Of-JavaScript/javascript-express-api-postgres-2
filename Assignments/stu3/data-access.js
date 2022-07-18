const GET_ACCOUNT_TYPE = 'select * from account_type'

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');


exports.getAccoutTypes = async () => {
    let retval = null;
    try {
        let r = await pool.query(GET_ACCOUNT_TYPE)
        retval = r.rows
    } catch (err) {
        console.error(err);
    }
    return retval;
}
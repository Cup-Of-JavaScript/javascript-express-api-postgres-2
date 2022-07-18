const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const transaction_type = 'select * from transaction_type'

exports.getTransactionTypes = async () => {
    let retval = null;
    try {
       let r = await pool.query(transaction_type);
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
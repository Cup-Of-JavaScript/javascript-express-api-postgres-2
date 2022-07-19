const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const Tran_Date = 'select * from transaction where transaction_date between $1 and $2 order by transaction_date asc'

exports.getDates = async (startDate, endDate) => {
    let retval = null;
    try {
       let r = await pool.query (Tran_Date,[startDate, endDate]) 
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
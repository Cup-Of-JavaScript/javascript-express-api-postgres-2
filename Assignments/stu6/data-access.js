const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const User_Dob = 'select * from bank_user where extract(YEAR from dob) >= $1'

exports.getUsersDob = async (filter_year) => {
    let retval = null;
    try {
       let r = await pool.query (User_Dob,[filter_year]) 
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
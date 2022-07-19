const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const User_Accounts = 
`select 
    a.account_id,
    at.account_name
from account a
    join account_type at on a.account_type_id = at.account_type_id
where bank_user_id = $1`

exports.getUsersAcc = async (uid) => {
    let retval = null;
    try {
       let r = await pool.query (User_Accounts,[uid]) 
       retval = r.rows;
    } catch (err) {
        console.error(err);
    }
    return retval;
}
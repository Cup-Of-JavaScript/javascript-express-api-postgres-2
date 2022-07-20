const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

const Account_Name = 'select * from view_transactions where account_id = $1'

const Deposits = `
select sum(dollar_amount) as total_deposit
from 
    view_transactions 
where 
    the_type = 'deposit' and account_id = $1`

const Withdrawals = `
select sum(dollar_amount) as total_withdrawal
from 
    view_transactions 
where 
    the_type = 'withdraw' and account_id = $1`

exports.getBalance = async (account_id) => {
    let retval = { 
        balance: 0, 
        account: " "
    }
    try {
        await pool.query("BEGIN")

        // Get account name.
        const accountNameRow = await pool.query(Account_Name, [account_id])
        retval.account = accountNameRow.rows[0].account_name;

        // Determine total deposits.
        const depositResult = await pool.query(Deposits, [account_id]) 
        const sumDeposit = (depositResult.rows[0]) ? depositResult.rows[0].total_deposit : 0 // Inline if statement.

        // Determine total withdrawals.
        const withDrawResult = await pool.query(Withdrawals, [account_id]) 
        const sumWithdrawal = (withDrawResult.rows[0]) ? withDrawResult.rows[0].total_withdrawal : 0  // Inline if statement.
        const balance = sumDeposit - sumWithdrawal
        
        // Format results.
        retval.balance = currencyFormatter.format(balance, { code: 'USD' });
        await pool.query("COMMIT")
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}
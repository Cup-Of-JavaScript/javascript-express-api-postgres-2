//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let txn  = {
        "transactionTypeId": 1,
        "dollarAmount": 50,
        "transactionDate": '06-06-22'
        }
    
    let r = await dataAccess.addTxn(1, txn)
    console.log(r)
    process.exit()
}


main()

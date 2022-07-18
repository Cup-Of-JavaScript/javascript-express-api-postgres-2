//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let bankUserId = 1
    let r = await dataAccess.getAccounts(bankUserId)
    console.log(r)
    process.exit()
}

main()

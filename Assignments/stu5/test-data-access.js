//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    //let accountId = 1
    let r = await dataAccess.getAccountBalance(1)
    console.log(r)
    process.exit()
}

main()

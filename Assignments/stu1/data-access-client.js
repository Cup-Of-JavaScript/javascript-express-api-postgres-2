//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getTransactionDateRange('03/01/2022', '03/04/2022')
    console.log(r)
    process.exit()
}

main()

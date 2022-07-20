//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getBalance(2)
    console.log(hello)
    process.exit()
}

main()

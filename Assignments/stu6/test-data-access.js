//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getUsersDob()
    console.log(dataAccess.getUsersDob)
    process.exit()
}

main()

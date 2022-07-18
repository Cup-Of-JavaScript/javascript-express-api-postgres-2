//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getUsers(1970)
    console.log(r)
    process.exit()
}

main()

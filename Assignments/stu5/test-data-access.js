//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let dob = '1970-08-29'
    let r = await dataAccess.getUsers(dob)
    console.log(r)
    process.exit()
}

main()

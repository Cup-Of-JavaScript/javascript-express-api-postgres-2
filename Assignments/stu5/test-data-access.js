//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require('./data-access');

const main = async () => {
    let startDate ='3/1/2022' 
    let endDate = '4/1/2022'
    let r = await dataAccess.getTransactions(startDate,endDate)
    console.log(r)
    process.exit()
}

main()

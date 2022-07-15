const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.insertTransaction(3,1,600.00, '7/15/2022')
    console.log(r)
    process.exit()
}

main()

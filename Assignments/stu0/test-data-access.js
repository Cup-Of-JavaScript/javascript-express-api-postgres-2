const dataAccess = require('./data-access');

const main = async () => {
    let person  = {
        personTypeId: 1,
        bookStoreId: 1,
        firstName: "joe",
        lastName: "smith",
        dob: "8/29/1970"
    }

    let r = await dataAccess.insertTransaction(3,1,600.00, '7/15/2022')
    console.log(r)
    process.exit()
}

main()

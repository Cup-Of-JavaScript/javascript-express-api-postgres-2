const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getAccountBalanceForAccountId(1);
    console.log(r)
    process.exit()
}

main()

const dataAccess = require('./data-access');

const main = async () => {
    let r = await dataAccess.getPersonsForType('Manager')
    console.log(r)
    process.exit()
}

main()

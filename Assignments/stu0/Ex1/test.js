const { test, getPerson } = require('./data-access');

const main = async () => {
    let r = await getPerson(1)
    console.log(r)
    process.exit()
}

main()


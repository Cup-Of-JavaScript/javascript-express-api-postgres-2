//
// File: test-data-access.js
// Desc: Simple driver to test our data access layer.
//

const dataAccess = require("./data-access");

const main = async () => {
  let r = await dataAccess.getTransactionsForAccount(1, "1/1/2022", "1/4/2022");
  console.log(r);
  process.exit();
};

main();

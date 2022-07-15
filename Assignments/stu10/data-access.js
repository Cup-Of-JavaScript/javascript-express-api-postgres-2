//
// File: data-access.js
// Date: 7/15/2022
// Desc: CommonJS module that contains our data access code.
//

const { pool } = require("../../postgres-pool");
const currencyFormatter = require('currency-formatter');

module.exports.getAccoutTypes = async () => {
    let retval = null;
    try {
       // TODO...
    } catch (err) {
        console.error(err);
    }
    return retval;
}
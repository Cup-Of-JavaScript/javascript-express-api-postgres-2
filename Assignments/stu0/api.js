// 
// File: api.js
// Auth: Martin Burolla
// Date: 6/30/2022
// Desc: Simple API using CommonJS modules.
//

const cors = require('cors');
const express = require('express');
const dataAccess = require('./data-access'); 

const PORT = 5150;
const app = express();

let corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

// Middleware...
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//
// GET /ex1/account-types/
//

app.get('/ex1/account-types/', cors(corsOptions), async (req, res) => { 
    const accountTypes = await dataAccess.getAccoutTypes();
    res.send(accountTypes);
});

//
// GET /ex2/account-types/
//

app.get('/ex1/transaction-types/', cors(corsOptions), async (req, res) => { 
    const transactionTypes = await dataAccess.getTransactionTypes();
    res.send(transactionTypes);
});





app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

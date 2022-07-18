// 
// File: api.js
// Date: 6/30/2022
// Desc: Simple API using CommonJS modules.
//

const cors = require('cors');
const express = require('express');
const dataAccess = require('./data-access');

const PORT = 5150;
const app = express();

var corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

// Middleware...
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//ex.1
app.get('/ex1/account-types/', cors(corsOptions), async (req, res) => { 
    let accounts = await dataAccess.getAccoutTypes()
    res.send(accounts)
});

//ex.2
app.get('/ex2/transaction-types/', cors(corsOptions), async (req, res) => { 
    let transactions = await dataAccess.getTransactionTypes()
    res.send(transactions)
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

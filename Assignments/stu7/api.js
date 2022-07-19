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

//ex.3
app.get('/ex3/users/', cors(corsOptions), async (req, res) => { 
    let allUsers = await dataAccess.getUser(req.query['dobFilterYear'])
    res.send(allUsers)
});

//ex.4
app.get('/ex4/users/:id/accounts/', cors(corsOptions), async (req, res) => { 
    let userAccounts = await dataAccess.getAccounts(req.params['id'])
    res.send(userAccounts)
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

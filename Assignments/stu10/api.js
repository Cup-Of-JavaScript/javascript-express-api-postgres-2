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

//
//GET /ex1/account types/

app.get('ex1/account-types/', cors(corsOptions), async (req, res)=> { 
    let account = await dataAccess.getAccountTypes()
    res.send(account)
});

//GET /ex2/transactions/

app.get('ex2/transaction-types/', cors(corsOptions), async (req, res)=> { 
    let transaction = await dataAccess.getTransactionTypes()
    res.send(transaction)
});

// GET /ex3/users/
app.get('ex3/users', cors(corsOptions), async (req,res) => {
    let dobFilterYear = req.query['dobFilterYear']
    let user = await dataAccess.getUserByYear(dobFilterYear)
    res.send(user)
});

// GET /ex4/users/

app.get('/ex4/users/:id/accounts', cors(corsOptions), async (req, res) => {
    let accountId = req.params['id']
    let accounts = await dataAccess.getUserAccount(accountId)
    res.send(accounts)
});

app.listen(PORT, () => {
    console.log(`Banking API is running on port: ${PORT}`);
});

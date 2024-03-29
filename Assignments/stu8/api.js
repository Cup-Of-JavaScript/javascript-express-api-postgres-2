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
// API ENDPOINTS GO HERE...
//

app.get('/ex1/account-types', cors(corsOptions), async (req,res) => {
    let accounts = await dataAccess.getAccountTypes()
    res.send(accounts)
});

app.get('/ex2/transaction-types', cors(corsOptions), async (req,res) => {
    let accounts = await dataAccess.getTransactionTypes()
    res.send(accounts)
});

app.get('/ex3/users', cors(corsOptions), async (req,res) => {
    let dobFilterYear = req.query['dobFilterYear']
    let users = await dataAccess.getUsersByDob(dobFilterYear)
    res.send(users)
});

app.get('/ex4/users/:id/accounts', cors(corsOptions), async (req,res) => {
    let personId = req.params['id']
    let persons = await dataAccess.getUserAccounts(personId)
    res.send(persons)
});

app.get('/ex5/transactions', cors(corsOptions), async (req,res) => {
    let startDate = req.query['startDate'];
    let endDate = req.query['endDate'];
    let txns = await dataAccess.getTxnDateRange(startDate,endDate)
    res.send(txns)
});
 
app.get('/ex6/accounts/:id/balance', cors(corsOptions), async (req,res) => {
    let accountId = req.params['id']
    let balance = await dataAccess.getBalance(accountId)
    res.send(balance)
});

app.get('/ex7/accounts/:id/transactions', cors(corsOptions), async (req,res) => {
    let userId = req.params['id'];
    let startDate = req.query['startDate'];
    let endDate = req.query['endDate'];
    let txns = await dataAccess.getTxnDateRangeByUser(userId,startDate,endDate)
    res.send(txns)
});

app.post('/ex8/accounts/:id/transactions', cors(corsOptions), async (req,res) => {
    let accountId = req.params['id'];
    let txn = req.body;
    let txnId = await dataAccess.addTxn(accountId, txn)
    txn.txnId = txnId
    res.send(txn);
})

app.listen(PORT, () => {
    console.log(`Banking API is running on port: ${PORT}`);
});

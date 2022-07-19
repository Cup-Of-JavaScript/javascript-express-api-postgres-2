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
// GET /ex1/account-types/
app.get('/ex1/account-types/', cors(corsOptions), async (req, res) => { 
    let result = await dataAccess.getAccountTypes()
    res.send(result);
});
// GET /ex2/transaction-types/
app.get('/ex2/transaction-types/', cors(corsOptions), async (req, res) => { 
    let result = await dataAccess.getTransactionTypes()
    res.send(result);
});
// GET /ex3/users?dobFilterYear=1972
app.get('/ex3/users/', cors(corsOptions), async (req,res) => {
    let dobFilterYear = req.query['dobFilterYear']
    let users = await dataAccess.getUsers(dobFilterYear)
    res.send(users)
});
// GET /ex4/users/{bankUserId}/accounts
app.get('/ex4/users/:id/accounts', cors(corsOptions), async (req, res) => {
    let accountId = req.params['id']
    let accounts = await dataAccess.getAccount(accountId)
    res.send(accounts)
});
// GET /ex5/transactions?startDate={startDate}&endDate={endDate}
app.get('/ex5/transactions', cors(corsOptions), async (req,res) => {
    let startDate = req.query['startDate'];
    let endDate = req.query['endDate'];
    let daterange = await dataAccess.getDates(startDate,endDate)
    res.send(daterange)
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

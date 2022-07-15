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

const corsOptions = {
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

app.get('/ex2/transaction-types/', cors(corsOptions), async (req, res) => { 
    const transactionTypes = await dataAccess.getTransactionTypes();
    res.send(transactionTypes);
});

//
// GET /ex3/account-types?dobFilterYear=1972
//

app.get('/ex3/users/', cors(corsOptions), async (req, res) => { 
    const dobFilterYear = req.query['dobFilterYear']
    const users = await dataAccess.getUsersDobFilter(dobFilterYear);
    res.send(users);
});

//
// GET /ex4/users/:id/accounts
//

app.get('/ex4/users/:id/accounts', cors(corsOptions), async (req, res) => { 
    const accounts = await dataAccess.getAccountsForUser(req.params['id'])
    res.send(accounts);
});

//
// GET /ex5/transactions?startDate=3/1/2022&endDate=4/1/2022
//

app.get('/ex5/transactions', cors(corsOptions), async (req, res) => { 
    const endDate = req.query['endDate']
    const startDate = req.query['startDate']
    const transactions = await dataAccess.getTransactionsForDateRange(startDate, endDate)
    res.send(transactions);
});

//
// GET /ex6/accounts/:accountId/balance
//

app.get('/ex6/accounts/:accountId/balance', cors(corsOptions), async (req, res) => { 
    const balance = await dataAccess.getAccountBalanceForAccountId(req.params['accountId'])
    res.send(balance);
});

//
// GET /ex7/accounts/:accountId/transactions?startDate={startDate}&endDate={endDate}
//

app.get('/ex7/accounts/:accountId/transactions', cors(corsOptions), async (req, res) => { 
    const endDate = req.query['endDate']
    const startDate = req.query['startDate']
    const accountId = req.params['accountId']
    const transactions = await dataAccess.getAccountTransactionsForDateRange(accountId, startDate, endDate)
    res.send(transactions);
});

//
// POST ex8/accounts/{accountId}/transactions
//

app.post('/ex8/accounts/:accountId/transactions', cors(corsOptions), async (req, res) => { 
    const accountId = req.params['accountId']
    const transaction = req.body
    const transactions = await dataAccess.insertTransaction(
        accountId, 
        transaction.transactionTypeId, 
        transaction.dollarAmount, 
        transaction.transactionDate)
    res.send(transactions);
});


app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

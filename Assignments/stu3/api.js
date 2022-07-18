const cors = require('cors');
const express = require('express');
//const { types } = require('pg');
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
// EX 1
//

app.get('/ex1/account-types/', cors(corsOptions), async (req, res) => { 
    let types = await dataAccess.getAccountTypes()
    res.send(types)
    //res.send('test')
});


//
// EX 2
//

app.get('/ex2/transaction-types/', cors(corsOptions), async (req, res) => { 
    let transactions = await dataAccess.getTransactionTypes()
    res.send(transactions)
    //res.send('test')
});


app.listen(PORT, () => {
    console.log(`Banking API running on port: ${PORT}`);
});

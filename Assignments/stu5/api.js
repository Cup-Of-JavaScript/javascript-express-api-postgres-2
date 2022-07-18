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

// GET /ex1/account-types/
app.get('/ex1/account-types/', cors(corsOptions), async (req, res) => { 
    let result = await dataAccess.getAccoutTypes()
    res.send(result);
});

// GET /ex2/transaction-types/
app.get('/ex2/transaction-types/', cors(corsOptions), async (req, res) => { 
    let result = await dataAccess.getTransactionTypes()
    res.send(result);
});


// GET /ex3/users?dobFilterYear={year}
app.get('/ex3/users/', cors(corsOptions), async (req, res) => { 
    let dob = req.query['dob']
    let result = await dataAccess.getUsers(dob)
    console.log(result)
     res.send(result);
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

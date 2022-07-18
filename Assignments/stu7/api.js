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
    // Parsing...
    // const id = req.params['id'];                 // Parse the path params from URL (e.g. /persons/1)
    // const queryParam1 = req.query['personType']  // Parse the query string from URL (e.g. ?personType=manager)
    // const body = req.body;                       // Parse the the body from the request
    
    // Data access & business logic...
    // const result = await dataAccess.<YOUR FUNCTION HERE>
    
    // Response...
    // res.status(404); // 201, 400, 403, etc.
    // res.send(<YOUR OBJECT HERE>);
});


app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

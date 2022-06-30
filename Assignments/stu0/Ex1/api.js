// 
// File: api.js
// Auth: Martin Burolla
// Date: 6/30/2022
// Desc: Simple API using CommonJS modules.
//

const cors = require('cors');
const express = require('express');
const dataAccess = require('./data-access');

const PORT = 5152;
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
// GET /persons/:id
//

app.get('/persons/:id', cors(corsOptions), async (req, res) => { 
const da = require('./data-access');
    let person = await dataAccess.getPerson(req.params['id'])
    // let body = req.body;
    res.send(person);
});

app.listen(PORT, () => {
    console.log(`Local Web API Express Server Running on Port: ${PORT}`);
});


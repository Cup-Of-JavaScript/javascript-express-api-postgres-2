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
// GET /ex1/persons/
//

app.get('/ex1/persons/', cors(corsOptions), async (req, res) => { 
    let person = await dataAccess.getPersons()
    res.send(person);
});

//
// GET /ex2/persons/:id
//

app.get('/ex2/persons/:id/', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getPerson(req.params['id'])
    res.send(persons);
});

//
// GET /ex3/persons?personType={Manager|Cashier|Stock%20Person}
//

app.get('/ex3/persons', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getPersonsForType(req.query['personType'])
    res.send(persons);
});

//
// GET /ex4/books
//

app.get('/ex4/books', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getBooks()
    res.send(persons);
});


//
// GET /ex5/books/:id
//

app.get('/ex5/books/:id', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getBook(req.params['id'])
    res.send(persons);
});


app.listen(PORT, () => {
    console.log(`Local Web API Express Server Running on Port: ${PORT}`);
});


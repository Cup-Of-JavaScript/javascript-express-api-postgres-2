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

let corsOptions = {
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
    let persons = await dataAccess.getPersons()
    res.send(persons);
});

//
// GET /ex2/persons/:id
//

app.get('/ex2/persons/:id/', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getPerson(req.params['id'])
    if (!persons) {
        res.status(404);
    }
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

//
// GET /ex6/bookstores/:id/people
//

app.get('/ex6/bookstores/:id/people', cors(corsOptions), async (req, res) => { 
    let persons = await dataAccess.getPeopleAtBookstore(req.params['id'])
    res.send(persons);
});

//
// POST /ex7/persons
//

app.post('/ex7/persons', cors(corsOptions), async (req, res) => { 
    let person = req.body;
    let personId = await dataAccess.addPerson(req.body)
    person.personId = personId
    res.send(person);
});

//
// POST /ex8/bookstores
//

app.post('/ex8/bookstores', cors(corsOptions), async (req, res) => { 
    let book = req.body;
    let bookId = await dataAccess.addBookstore(book.bookstoreName)
    book.bookId = bookId
    res.send(book);
});

//
// PUT /ex9/persons
//

app.put('/ex9/persons', cors(corsOptions), async (req, res) => { 
    let person = req.body;
    let updatedPerson = await dataAccess.updatePerson(person.personId, person.firstName, person.lastName)
    res.send(updatedPerson);
});

//
// DELETE /ex10/persons/:id
//

app.delete('/ex10/persons/:id', cors(corsOptions), async (req, res) => { 
    let personId = req.params['id']
    let response = await dataAccess.deletePerson(personId)
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

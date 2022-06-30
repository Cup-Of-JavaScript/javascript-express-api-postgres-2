// 
// File: api.js
// Auth: Martin Burolla
// Date: 6/22/2022
// Desc: Simple API
//

const cors = require('cors');
const express = require('express');


const PORT = 5152;
const app = express();
const personArray = [];

// Populate with three people...
personArray.push( {
    id: 1,
    name: "Alice",
    age: 11
})

personArray.push( {
    id: 2,
    name: "Bob",
    age: 22
})

personArray.push( {
    id: 3,
    name: "Charlie",
    age: 33
})

var corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

// Middleware...
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//
// GET /persons
//

app.get('/persons', cors(corsOptions), (req, res) => { 
    res.send(personArray);
});


//
// GET /persons/:id
//

app.get('/persons/:id', cors(corsOptions), (req, res) => { 
    let p = personArray.filter(p => p.id === parseInt(req.params['id']))
    console.log(personArray)
    res.send(p[0]);
});

//
// POST /persons
//
// Body:
// {
//    id: <number>,
//    name: <string>,
//    age: <number>
// }
//

app.post('/persons', cors(corsOptions), (req, res) => {
    personArray.push(req.body)
    console.log(personArray)
    res.send(req.body);
});

//
// DELETE /persons/:id
//

app.delete('/persons/:id', cors(corsOptions), (req, res) => {
    let index = personArray.findIndex(p => p.id === parseInt(req.params['id']))
    personArray.splice(index, 1)
    console.log(personArray)
    res.send("Ok");
});

app.listen(PORT, () => {
    console.log(`Express Server is running on port: ${PORT}`);
});


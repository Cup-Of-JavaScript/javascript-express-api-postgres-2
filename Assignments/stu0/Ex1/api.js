// 
// File: api.js
// Auth: Martin Burolla
// Date: 6/22/2022
// Desc: Simple API
//

const cors = require('cors');
const express = require('express');
const { getPerson } = require('./data-access');

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
    let r = await getPerson(req.params['id'])
    // let p = personArray.filter(p => p.id === parseInt(req.params['id']))
    // console.log(personArray)
    res.send(r);
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
    console.log(`Local Web API Express Server Running on Port: ${PORT}`);
});


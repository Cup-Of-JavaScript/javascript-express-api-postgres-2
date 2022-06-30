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
// GET /bookstores/:id/books
//

app.get('/bookstores/:id/books', cors(corsOptions), async (req, res) => { 
    let books = await dataAccess.getBooksForBookstore(req.params['id'])
    res.send(books);
});

app.listen(PORT, () => {
    console.log(`Bookstore API is running on port: ${PORT}`);
});

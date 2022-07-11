// 
// File: api.js
// Auth: 
// Date: 6/30/2022
// Desc: Template used for creating an Express web API.
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

app.get('/ex1/persons/:id', cors(corsOptions), async (req, res) => { 
    // let result = await dataAccess. <YOUR FUNCTION HERE>
    // let id = req.params['id'];                 // Read path params from URL.
    // let queryParam1 = req.query['personType']  // Read query params from URL.
    // let body = req.body;                       // Read request body.
    // res.status(404);                           // Change status code.
    // res.send(<YOUR OBJECT HERE>);
});

app.listen(PORT, () => {
    console.log(`Local Web API Express Server Running on Port: ${PORT}`);
});

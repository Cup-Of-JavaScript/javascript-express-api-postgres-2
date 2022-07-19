const cors = require('cors');
const express = require('express');
const dataAccess = require('./data-access');

const PORT = 5150;
const app = express();

var corsOptions = {
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/ex3/users/', cors(corsOptions), async (req,res) => {
    let filter_year = req.query['filter_year']
    let users = await dataAccess.getUsersDob(filter_year)
    res.send(users)
});

app.listen(PORT, () => {
    console.log(`Banking API is running on port: ${PORT}`);
});

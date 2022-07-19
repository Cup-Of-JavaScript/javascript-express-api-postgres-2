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

app.get('/ex5/transactions', cors(corsOptions), async (req,res) => {
    let startDate = req.query['startDate'];
    let endDate = req.query['endDate'];
    let daterange = await dataAccess.getDates(startDate,endDate)
    res.send(daterange)
});

app.listen(PORT, () => {
    console.log(`Banking API is running on port: ${PORT}`);
});

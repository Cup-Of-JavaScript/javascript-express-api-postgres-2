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

app.get('/ex6/accounts/:id/balance', cors(corsOptions), async (req,res) => {
    let account_id = req.params['id'];
    let balance = await dataAccess.getBalance(account_id)
    res.send(balance)
});

app.listen(PORT, () => {
    console.log(`Banking API is running on port: ${PORT}`);
});

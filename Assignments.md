# JavaScript Express API Postgres 2 Assignments

We will build an Express that connects to a Postgres database. The web API will contain 10 endpoints and model a Bank.  Each exercise corresponds to an API endpoint.  For example:

```
GET http://localhost:5150/ex1/account-types/
GET http://localhost:5150/ex2/transaction-types/
GET http://localhost:5150/ex3/account-types/
...
```

Run the `SQL\create-banking-db.sql` script in a local Postgres database and be sure to update/create `postgres-pool.js` to connect to this banking database.

```
const { Pool } = require("pg");

exports.pool = new Pool({
    user: "postgres",
    password: "xxxxx", // <== Replace with your password.
    database: "Bankiung", // <=== Check database name.
    host: "localhost",
    port: 5432,
  });

```

Use [Thunder Client](https://www.thunderclient.com/) to test every API endpoint.

![](./docs/thunder-client.png)

# Ex. 1 Get All Account Types
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex1/account-types/
BODY: None
```

This endpoint returns ALL the account types from the `account_type` table:

Output:

```
[
  {
    "account_type_id": 1,
    "account_name": "checking"
  },
  {
    "account_type_id": 2,
    "account_name": "savings"
  },
  {
    "account_type_id": 3,
    "account_name": "retirement"
  }
]
```

# Ex. 2 Get Transaction Types
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex2/transaction-types/
BODY: None
```

This endpoint returns ALL the transaction types from the `transaction_type` table:

Output:

```
[
  {
    "transaction_type_id": 1,
    "the_type": "deposit"
  },
  {
    "transaction_type_id": 2,
    "the_type": "withdraw"
  }
]
```



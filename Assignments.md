# JavaScript Express API Postgres 2 Assignments

We will build an Express that connects to a Postgres database. The web API will contain 10 endpoints and model a Bank.  Each exercise corresponds to an API endpoint.  For example:

```
GET http://localhost:5150/ex1/account-types/
GET http://localhost:5150/ex2/transaction-types/
GET http://localhost:5150/ex3/users?dobFilterYear=1972
...
```

Run the `SQL\create-banking-db.sql` script in a local Postgres database and be sure to update/create `postgres-pool.js` to connect to this banking database.  This script creates the following database:

![](./docs/bank-erd.png)

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

Create a collection with [Thunder Client](https://www.thunderclient.com/) and test every API endpoint.

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
URL:  http://localhost:5150/ex3/users?dobFilterYear=1972
BODY: None
```

This endpoint returns ALL the users that have been born after the year 1972.

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

# Ex. 3 Get Users
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex2/transaction-types/
BODY: None
```

Output:
```
[
  {
    first_name: 'Bob',
    last_name: 'Marley',
    dob: 1975-01-29T05:00:00.000Z,
    bank_user_id: 2
  },
  {
    first_name: 'Charlies',
    last_name: 'Daniels',
    dob: 1973-08-29T04:00:00.000Z,
    bank_user_id: 3
  }
]
```

# Ex 4. 
















Database views provide abstractions over our data.  Views help us by combining many tables into one virtual table and allow us to see related data easier.  Create a view called `view_users` that joins the following tables:
- account
- bank_user
- account_type

```
create view view_users as 
    select 
      a.account_id,
      bu.bank_user_id,
      at.account_type_id,
      a.create_date,
      bu.first_name,
      bu.last_name,
      bu.dob,
      at.account_name
    from account a
      join bank_user TODO...
      join account_type TODO...

```

Once the view has been created, we can query the view as if it were a database table (e.g. `select * from view_users`).

Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex3/users/
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
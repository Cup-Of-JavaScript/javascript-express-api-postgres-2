# JavaScript Express API Postgres Assignments

We will build an Express that connects to a Postgres database. The web API will contain 10 endpoints and model a Bank.  Each exercise corresponds to an API endpoint.  For example:

```
GET http://localhost:5150/ex1/persons/

...
```

Be sure to run the `SQL\create-banking-db.sql` script to create the tables and data that this API will consume.

Use [Thunder Client](https://www.thunderclient.com/) to test your API endpoints.

![](./docs/thunder-client.png)

# Ex. 1 Get All Account Types
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex1/account-types/
BODY: None
```

This endpoint returns ALL the account types from the `account_type` table:

Example output:

```

```

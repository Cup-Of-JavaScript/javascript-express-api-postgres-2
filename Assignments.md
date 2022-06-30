# JavaScript Express API Postgress Assignments

We will build a web API with 10 endpoints.  Each exercise will correspond to an API endpoint.  For example:

```
GET http://localhost:5150/ex1/persons/
GET http://localhost:5150/ex3/persons/1
GET http://localhost:5150/ex2/persons/1?type=person
...
```

# Ex. 1
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex1/persons/
BODY: None
```

This endpoint returns ALL the people from the `person` table:

Example output:

```
[
  {
    "person_id": 1,
    "person_type_id": 1,
    "book_store_id": 1,
    "first_name": "Alice",
    "last_name": "Jones",
    "dob": "1970-08-29T04:00:00.000Z"
  },
  {
    "person_id": 2,
    "person_type_id": 1,
    "book_store_id": 2,
    "first_name": "Bob",
    "last_name": "Marley",
    "dob": "1975-02-15T05:00:00.000Z"
  },
  ...
```

# Ex. 2
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex1/persons/{userId}
BODY: None
```

This endpoint returns all the information for a particular person:

Example Output for  http://localhost:5150/ex1/persons/1: 
```
{
  "person_id": 1,
  "person_type_id": 1,
  "book_store_id": 1,
  "first_name": "Alice",
  "last_name": "Jones",
  "dob": "1970-08-29T04:00:00.000Z"
}
```

# Ex. 3
Create the following API endpoint:

```
Method: GET
URL:  http://localhost:5150/ex1/persons?personType={Cashier|Manager|Stock%20Person}
BODY: None
```

This endpoint returns all of the types of people for the specified type.

Example Output for  http://localhost:5150/ex1/persons?personType=Manager: 
```
[
  {
    "person_id": 8,
    "person_type_id": 3,
    "book_store_id": 3,
    "first_name": "Harry",
    "last_name": "Chapmin",
    "dob": "1980-06-09T04:00:00.000Z",
    "person_type": "Stock Person"
  },
  {
    "person_id": 10,
    "person_type_id": 3,
    "book_store_id": 3,
    "first_name": "Kim",
    "last_name": "Weldon",
    "dob": "1970-11-08T05:00:00.000Z",
    "person_type": "Stock Person"
  },
  {
    "person_id": 9,
    "person_type_id": 3,
    "book_store_id": 3,
    "first_name": "John",
    "last_name": "Grow",
    "dob": "1988-10-08T04:00:00.000Z",
    "person_type": "Stock Person"
  }
]
```

# Ex. 4




# Ex. 5

# Ex. 6

# Ex. 7

# Ex. 8

# Ex. 9

# Ex. 10

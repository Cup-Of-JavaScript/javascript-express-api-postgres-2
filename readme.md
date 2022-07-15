# JavaScript Express API Postgress 2

Assignments are located [here](./Assignments.md).

# Getting Started
- Clone this repo
- Install dependencies: `npm install` (execute in the same directory as `package.json` file)
- Create file: `postgres-pool.js` from file: [postgres-pool.js.template](./postgres-pool.js.template)
  - Update `postgres-pool.js` with your database password and check database name

# Notes
- [api.template.js](./api.template.js) is a file that can be used to start building your Express API
- Run `create-banking-db.sql` in your student database (if you haven't already)

# Videos
- [What is an API (7m)](https://youtu.be/Yzx7ihtCGBs)
- [What is a ReST API (6m)](https://youtu.be/SLwpqD8n3d0)
- [Oktane17: Designing Beautiful ReST + JSON APIs (48m)](https://youtu.be/MiOSzpfP1Ww)
- [ReST Tutorial - How to Design a Good ReSTful API (8m)](https://youtu.be/sMKsmZbpyjE)
- [Roy Fielding - The God Father of the ReST API (11m)](https://youtu.be/w5j2KwzzB-0)
- [HTTP ReST API Crash Course w/ Express (40m)](https://youtu.be/iYM2zFP3Zn0)

# Transactions
Transactions in Postgres are accomplished in the following manner:

```
module.exports.getAccountData = async (accountId) => {
    let retval = null;
    try {
        await pool.query("BEGIN")

        //
        // TODO... your queries here
        //

        await pool.query("COMMIT")
    } catch (err) {
        await pool.query("ROLLBACK")
        console.error(err);
    }
    return retval;
}
```

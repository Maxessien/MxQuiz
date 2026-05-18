```bash
const format = require('pg-format');

const users = [
  ['Alice', 'alice@example.com'],
  ['Bob', 'bob@example.com']
];

// %L safely converts the multi-dimensional array into safe nested values
const queryText = format('INSERT INTO users (name, email) VALUES %L', users);

await pool.query(queryText);
```
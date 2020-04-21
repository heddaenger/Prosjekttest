//Connecting to postgres database.
const { Pool, Client } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: 'postgres',
});

pool.query('SELECT NOW()').then(result => {
    console.log(result.rows)
    pool.end()
});

module.exports = pool; //definerer den i en fil og eksporterer den så den kan requires andre steder den skal brukes.


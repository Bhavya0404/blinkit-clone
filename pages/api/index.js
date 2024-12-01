const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'admin',
    database: 'blinkit',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

async function Test(params) {
    const temp = await pool.query('select * from stores');
    console.log(temp);
}
Test();
// console.log(result);
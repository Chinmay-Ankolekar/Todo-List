const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
//    user: "postgres",
//    password: "chinmay.1221",
//    host: "localhost",
//    port: 5432,
//    database: "todos"
     connectionString: process.env.POSTGRES_URL
});

async function initDatabase (){
    
   await pool.query(`CREATE TABLE if not exists todo (
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255)
    );`)
}

module.exports = {
    pool,
    initDatabase
}

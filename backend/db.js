const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
<<<<<<< HEAD
//    user: "postgres",
//    password: "chinmay.1221",
//    host: "localhost",
//    port: 5432,
//    database: "todos"
     connectionString: process.env.POSTGRES_URL
=======
   user: "postgres",
   password: "***",
   host: "localhost",
   port: 5432,
   database: "todos"
>>>>>>> 58122794b65f26bf811a90c1bc82395cba785df0
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

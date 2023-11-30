const Pool = require("pg").Pool;

const pool = new Pool({
   user: "postgres",
   password: "chinmay.1221",
   host: "localhost",
   port: 5432,
   database: "todos"
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
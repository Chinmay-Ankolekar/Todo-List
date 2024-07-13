const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./db");

require('dotenv').config()
app.use(cors());
app.use(express.json());

//Routes//

//create a todo

app.get("/", async (req, res) => {
    try {
        res.json("Welcome to the todo app")
    } catch(err) {
        console.log(err.message);
    }
})

app.post("/todos", async (req, res)=> {
    try {
      const {description} = req.body;
      const newTodo = await db.pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",[description]
      );
      res.json(newTodo.rows[0]);
    } catch(err) {
       console.log(err.message);
    }
})

app.get("/todos", async(req,res)=>{
    try {
       const allTodos = await db.pool.query("SELECT * FROM todo")
       if(allTodos.rows.length === 0) {
           return res.json("No todos")
       }
       res.json(allTodos.rows)
    }catch(err) {
        res.json(err.message)
     }
})

app.put("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await db.pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id])

        res.json("todo was updated")
    } catch(err) {
        console.log(err.message);
     }
})

app.delete("/todos/:id", async (req,res )=> {
    try {
        const {id} = req.params;
        const deleteTodo = await db.pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("todo was deleted")
    }catch(err) {
        console.log(err.message);
     }
})

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))
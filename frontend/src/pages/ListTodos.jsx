import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`,{
                method : "DELETE"
            } );
            setTodos(todos.filter ( todo => todo.todo_id !== id))
        }catch(err) {
            console.error(err.message);
        }
  }

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <>
      <div className=" flex items-center justify-center">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden text-center mt-5">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Edit</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>

            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td className="py-2 px-4 border-b">
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button className="bg-red-500 text-white ml-2 px-2 py-1 rounded-md" onClick={()=> (deleteTodo(todo.todo_id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListTodos;

import { useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!description || description.trim() === '') {
        alert('Please enter a valid todo description.');
        return; 
      }

    try {
        
      const body = { description };
      const response = await fetch("https://todo-list-backend-ebon-delta.vercel.app/todos", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl text-center mt-11">Todo List</h1>
        <form
          className="flex flex-col items-center mt-4"
          onSubmit={onSubmitForm}
        >
          <input
            type="text"
            className="border-solid border-2 p-2 w-full max-w-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your task..."
          />
          <button className="mt-2 bg-green-500 text-white p-2 w-full max-w-md">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default InputTodo;

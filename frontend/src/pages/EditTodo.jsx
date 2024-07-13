import { useState } from "react";

function EditTodo({todo}) {
    const [description, setDescription] = useState(todo.description);

    const updateDescription = async(e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`https://todo-list-backend-ebon-delta.vercel.app/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"content-Type" :"application/json"},
                body: JSON.stringify(body)
            })
            window.location="/"
        } catch (err) {
            console.error(err.message)
        }
    }
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit 
      </button>

      <div
        class="modal fade"
        id={`id${todo.todo_id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Edit Todo
              </h5>
            </div>
            <div class="modal-body">
              <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick = {e => updateDescription(e)}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;

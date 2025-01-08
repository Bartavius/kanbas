import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState(
    {
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    }
);
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos </a><hr/>
      
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <input id="wd-todo-id" defaultValue={todo.id} className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />
      
      <h3>Filtering Array Items</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}?completed=true`}>
            Get Completed Todos
        </a><hr/>
        
        <h3>Creating new Items in an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary"
            href={`${API}/create`}>
            Create Todo
        </a><hr/>
        
        <h3>Deleting from an Array</h3>
        <a id="wd-retrieve-completed-todos" className="btn btn-primary float-end" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id} </a>
        <input defaultValue={todo.id} className="form-control w-50" onChange={(e) => setTodo({ ...todo, id: e.target.value })}/><hr/>
        
        <h3>Updating an Item in an Array</h3>
            <div className="mb-3 d-block">
                <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary float-end">
                    Update Todo Title</a>
                <input id="wd-todo-id" defaultValue={todo.id} className="form-control d-inline w-25 me-2"
                    onChange={(e) => setTodo({ ...todo, id: e.target.value })}/>
                <input id="wd-todo-title" defaultValue={todo.title} className="form-control d-inline w-50 me-2" 
                        onChange={(e) => setTodo({ ...todo, title: e.target.value }) }/>
            </div>

            <div className="mb-3 d-block">
                <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary float-end">
                    Update Todo Description</a>  
                <textarea id="wd-todo-description" className="form-control w-50" onChange={(e) => setTodo({...todo, description: e.target.value})} />
            </div>

            <div className="mb-3 d-block">
                <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary float-end">
                    Update Todo Complete</a>  
                <input id="wd-todo-complete" type="checkbox" className="form-check-input me-2" checked={todo.completed}
                    onChange={ (e) => setTodo({...todo, completed: e.target.checked}) } />
                <label htmlFor="wd-todo-complete" className="form-check-label">Complete</label>
            </div>
        
    

    </div>
);}

import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
      <li className="list-group-item border border-gray">
        <button onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click" className="btn btn-success float-end me-1"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click" className="btn btn-warning float-end me-1"> Update </button>
        <input value={todo.title}
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }
          className="ms-2 pt-1 pb-1 border border-gray rounded-2"/>
      </li>
  );}
  
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./AddTodo.css";
// eslint-disable-next-line
import {
  addTodo,
  deleteTodo,
  updateTodo as updateTodoAction,
} from "../redux/action";
import Todos from "./Todos";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    todo: "",
  });
  const [updateTodo, setUpdateTodo] = useState(null);
  const newId = uuidv4();
  const todoObj = useSelector((state) => state.todoObj);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (updateTodo) {
      const updatedTodo = { ...todo, id: updateTodo };
      dispatch(updateTodoAction(updatedTodo));
      setUpdateTodo(null);
    } else {
      const newTodo = { ...todo, id: newId };
      dispatch(addTodo(newTodo));
    }
    setTodo({
      title: "",
      todo: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = (todo) => {
    setUpdateTodo(todo.id);
    setTodo({
      title: todo.title,
      todo: todo.todo,
    });
  };
  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="todo" className="form-label">
            Todo
          </label>
          <input
            type="text"
            className="form-control"
            id="todo"
            value={todo.todo}
            onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={
            todo.title.length > 0 && todo.todo.length > 0 ? false : true
          }
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      <div className="container">
        {todoObj.map((object) => (
          <div key={object.id} className="card my-3">
            <Todos todos={object} />
            <div className="card-body">
              <button
                type="button"
                className="btn btn-danger mx-1 my-1"
                onClick={() => handleDelete(object.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success mx-1 my-1"
                onClick={() => handleUpdate(object)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddTodo;

import React, { useState } from "react";
import Todos from "./Todos";
import { v4 as uuidv4 } from "uuid";
import "./AddTodo.css";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    title: "",
    todo: "",
  });
  const [todoObj, setTodoObj] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(null);
  const newId = uuidv4();
  const handleSubmit = (e) => {
    if (updateTodo) {
      setTodoObj(
        todoObj.map((toodo) =>
          toodo.id === updateTodo ? { ...toodo, ...todo } : toodo
        )
      );
      setTodo({
        title: "",
        todo: "",
      });
    } else {
      const newTodo = { ...todo, id: newId };
      setTodoObj([...todoObj, newTodo]);
      setTodo({
        title: "",
        todo: "",
      });
    }
  };

  const handleDelete = (id) => {
    setTodoObj(todoObj.filter((todos) => todos.id !== id));
  };

  const handleUpdate = (todoo) => {
    setUpdateTodo(todoo.id);
    setTodo({
      title: todoo.title,
      todo: todoo.todo,
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

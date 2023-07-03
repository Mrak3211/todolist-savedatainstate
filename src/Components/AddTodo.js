import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import "./AddTodo.css";
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
    completionTime: "",
  });
  const [updateTodo, setUpdateTodo] = useState(null);
  const newId = uuidv4();
  const todoObj = useSelector((state) => state.todoObj);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (todo.title.trim() !== "" && todo.todo.trim() !== "") {
      if (updateTodo) {
        const updatedTodo = { ...todo, id: updateTodo };
        dispatch(updateTodoAction(updatedTodo));
        setUpdateTodo(null);
        const updatedTodoObj = todoObj.map((obj) =>
          obj.id === updateTodo ? updatedTodo : obj
        );
        const store = JSON.stringify(updatedTodoObj);
        localStorage.setItem("todo", store);
      } else {
        const newTodo = { ...todo, id: newId, completed: false };
        dispatch(addTodo(newTodo));
        const store = JSON.stringify([...todoObj, newTodo]);
        localStorage.setItem("todo", store);
      }
      setTodo({
        title: "",
        todo: "",
        completionTime: "",
      });
      checkExpiredTodos();
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    const updatedTodoObj = todoObj.filter((object) => object.id !== id);
    const store = JSON.stringify(updatedTodoObj);
    localStorage.setItem("todo", store);
    checkExpiredTodos();
  };

  const handleUpdate = (todo) => {
    setUpdateTodo(todo.id);
    setTodo({
      title: todo.title,
      todo: todo.todo,
      completionTime: todo.completionTime,
    });
  };

  // eslint-disable-next-line
  const storedTodos = JSON.parse(localStorage.getItem("todo")) || [];

  const checkExpiredTodos = () => {
    const currentTime = new Date().getTime();
    const storedTodos = JSON.parse(localStorage.getItem("todo")) || [];
    storedTodos.forEach((todo) => {
      const completionTime = new Date(todo.completionTime).getTime();
      const timeDifference = (completionTime - currentTime) / 1000;
      if (timeDifference <= 0 && !todo.completed) {
        alert(`Todo "${todo.todo}" has been completed ?`);
        todo.completed = true;
      }
    });

    const updatedStoredTodos = JSON.stringify(storedTodos);
    localStorage.setItem("todo", updatedStoredTodos);
  };

  useEffect(() => {
    checkExpiredTodos();
  }, []);

  const [searchResult, setSearchResult] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const trimmedSearchResult = searchResult.trim();
    if (trimmedSearchResult !== "") {
      const searchResults = storedTodos.filter((todo) =>
        todo.title.includes(trimmedSearchResult)
      );
      setFilteredTodos(searchResults);
    } else {
      setFilteredTodos([]);
    }
  }, [searchResult]);


  return (
    <>
      <div className="container my-3" style={{ maxInlineSize: "fit-content" }}>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchResult}
            onChange={(e) => setSearchResult(e.target.value)}
          />
        </form>
      </div>
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
        <div className="mb-3">
          <label htmlFor="completionTime" className="form-label">
            Completion Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="completionTime"
            value={todo.completionTime}
            onChange={(e) =>
              setTodo({ ...todo, completionTime: e.target.value })
            }
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
        {(filteredTodos.length > 0 ? filteredTodos : storedTodos).map(
          (object) => (
            <div key={object.id} className="card my-3">
              <Todos todos={object} searchh={filteredTodos} />
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
          )
        )}
      </div>
    </>
  );
};

export default AddTodo;

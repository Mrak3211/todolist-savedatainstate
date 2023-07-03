import React from "react";

const Todos = (props) => {
  const { title, todo, id, completionTime } = props.todos;

  return (
    <>
      <div className="container my-3" style={{ display: "flex" }}>
        <div className="card" style={{ width: "18rem", marginRight: "1rem" }}>
          <div className="card-body">
            <h5 className="card-title my-1">Title: {title}</h5>
            <h6 className="card-subtitle mb-2 text-muted my-1">Todo: {todo}</h6>
            <h6 className="card-subtitle mb-2 text-muted my-1">
              Todo Id: <b>{id}</b>
            </h6>
            <h6 className="card-subtitle mb-2 text-muted my-1">
              Completion Time: <b>{completionTime}</b>
            </h6>
            {/* <i className="fa-regular fa-clock" style={{ cursor: "pointer" }}></i> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;

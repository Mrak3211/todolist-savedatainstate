import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./contant";

const initialState = {
  todoObj: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoObj: [...state.todoObj, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todoObj: state.todoObj.filter((todo) => todo.id !== action.payload),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoObj: state.todoObj.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
};

export default reducer;

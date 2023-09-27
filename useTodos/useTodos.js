import { useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { useEffect } from "react";

// const initialState = [
//   // {
//   //   id: new Date().getTime(),
//   //   description: "Recolectar la piedra del alma",
//   //   done: false,
//   // },
// ];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    // console.log(todo);
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    // console.log("eliminando: ", id);
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    // console.log("toggle", { id });
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  // const todosCount = () => {
  //   return todos.length;
  // };

  // const pendingTodosCount = () => {
  //   return todos.filter((todo) => !todo.done).length;
  // };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};

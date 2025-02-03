"use client";

import { useCallback, useState } from "react";
import { useTodosService } from "./hooks/useTodosService";
import styles from "./page.module.css";

export default function Home() {
  const [todo, setTodo] = useState("Todo title");

  const todosService  = useTodosService();

  const addTodo = () => {
    todosService.addTodo(todo);
    setTodo("");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Todos</h1>
        <ul>
          {todosService.todos.length > 0 &&
            todosService.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  {todo.name}
                  <button onClick={() => todosService.removeTodo(todo.id)}>
                    ❎
                  </button>
                </li>
              );
            })}
        </ul>

        <div>
          <input
            type="text"
            value={todo}
            onInput={(event) =>
              setTodo((event.target as HTMLInputElement).value)
            }
          />
          <button onClick={addTodo}>Add Todo</button>
          <button onClick={() => todosService.clearTodos()}>Clear todos</button>
        </div>
      </main>
    </div>
  );
}

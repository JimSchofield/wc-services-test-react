"use client";

import { ServiceProviderComponent } from "wc-services";
import { useState } from "react";
import styles from "./page.module.css";
import { useService } from "./hooks/useService";
import MyTodos from "./services/my-todos";
import { MyToggle } from "./components/MyToggle";
import { MyList } from "./components/MyList";

customElements.define("service-provider", ServiceProviderComponent);

export default function Home() {
  const [todo, setTodo] = useState("Todo title");

  const [state, todosService] = useService(MyTodos, ({ todos, someBool }) => ({
    todos,
    someBool,
  }));

  const addTodo = () => {
    todosService.addTodo(todo);
    setTodo("");
  };

  console.log("Page rendering");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MyToggle />
        <h1>Todos ({state.todos.length})</h1>
        <p>{state.someBool.toString()}</p>
        <div>
          <button onClick={() => todosService.toggleBool()}>
            toggle boolean
          </button>
        </div>
        <ul>
          {state.todos &&
            state.todos.length > 0 &&
            state.todos.map((todo) => {
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
          <button onClick={() => todosService.reverseTodos()}>
            Reverse todos
          </button>
        </div>
        <MyList />
      </main>
    </div>
  );
}

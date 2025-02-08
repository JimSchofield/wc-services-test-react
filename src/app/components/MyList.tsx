import { useService } from "../hooks/useService"
import MyTodos from "../services/my-todos"

export const MyList = () => {
  const [ state, todosService ] = useService(MyTodos, ({ todos }) =>  todos)

  console.log("MyList rendering");

  return <div>
    {state.map((todo) => {
      return <li key={todo.id}>{todo.name}</li>
    })}
    <button onClick={() => todosService.toggleBool()}>toggle!</button>
  </div>
}

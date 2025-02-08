import { useService } from "../hooks/useService"
import MyTodos from "../services/my-todos"

export const MyToggle = () => {
  const [ state, todosService ] = useService(MyTodos, ({ someBool }) =>  someBool)

  console.log("Mytoggle rendering");

  return <div>
    <p>{state.toString()}</p>
    <button onClick={() => todosService.toggleBool()}>toggle!</button>
  </div>
}

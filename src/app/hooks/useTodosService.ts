import { useRef, useSyncExternalStore } from "react";
import MyTodos from "../services/my-todos";
import { Service, service } from "wc-services";

// export const useTodosService = () => {
//   const serviceInstance = service(owner, MyTodos);
//
//   const state = useSyncExternalStore(
//     (cb: () => void) => {
//       serviceInstance.addSubscriber(owner, cb);
//
//       return () => serviceInstance.removeSubscriber(owner);
//     },
//     () => serviceInstance.todos,
//   );
//
//   return { todosState: state, todosService: serviceInstance };
// };
//

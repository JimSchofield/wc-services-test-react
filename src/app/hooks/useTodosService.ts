import { useSyncExternalStore } from "react";
import MyTodos from "../services/my-todos";
import { service } from "wc-services";

const reactOwner = Symbol();

export const useTodosService = () => {
  // Since I'm not sure there is a stable "owner" reference, I'm going to make a symbol for this
  // hook?
  const myTodosService = service(reactOwner, MyTodos, () => {});

  const todosService = useSyncExternalStore(
    () => {
      myTodosService.notify();

      return () => myTodosService.removeSubscriber(reactOwner);
    },
    () => myTodosService,
  );

  return todosService;
};

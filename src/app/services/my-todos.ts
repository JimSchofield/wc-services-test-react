import { Service } from "wc-services";

export type Todo = {
  name: string;
  id: string;
};

export default class MyTodos extends Service {
  todos: Todo[] = [];

  addTodo(name: string) {
    this.todos.push({
      name,
      id: Math.random().toString().slice(2, 12),
    });
    this.notify();
  }

  removeTodo(idString: string) {
    this.todos = this.todos.filter(({ id }) => id !== idString);
    this.notify();
  }

  clearTodos() {
    this.todos = [];
    this.notify();
  }
}

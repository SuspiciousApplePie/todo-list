import { Todo } from "./todo";
import { TodoOperation } from "./todo";

const todo = new Todo("blonny");
TodoOperation.editTitle(todo, "New");
console.log(todo);
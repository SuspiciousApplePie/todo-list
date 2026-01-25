import { Todo } from "./todo";
import { TodoOperation } from "./todo";
import { Project } from "./project";
import { ProjectOperation } from "./project";

const project = new Project("proj1");

const todo = new Todo("blonny", 1, 3, 4, 6, 6);
const todo1 = new Todo("blonny", 1, 3, 4, 6, 6);
TodoOperation.editTitle(todo, "New");
console.log(todo);

ProjectOperation.addTask(project, todo);
ProjectOperation.addTask(project, todo1);
console.log(project);

localStorage.setItem(JSON.stringify(project.id), JSON.stringify(project));
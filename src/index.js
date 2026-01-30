import { Todo } from "./todo";
import { TodoOperation } from "./todo";
import { Project } from "./project";
import { ProjectOperation } from "./project";
import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";

const project = new Project("proj1");

const todo = new Todo("blonny", 1, 3, 4, 6, 6);
const todo1 = new Todo("blonny", 1, 3, 4, 6, 6);
TodoOperation.editTitle(todo, "New");

ProjectOperation.addTask(project, todo);
ProjectOperation.addTask(project, todo1);

Storage.saveProject(project);
Storage.readAllTask(project);

const names = Storage.readProjectNames();
const nav = new NavBar("Menu");
const task = new TaskDisplay();
nav.renderNavBar(names);
task.renderTask(Storage.readAllTask(project));
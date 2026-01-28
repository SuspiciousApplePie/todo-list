import { Todo } from "./todo";
import { TodoOperation } from "./todo";
import { Project } from "./project";
import { ProjectOperation } from "./project";
import { Storage } from "./storage";
import { NavBar } from "./ui";

const project = new Project("proj1");

const todo = new Todo("blonny", 1, 3, 4, 6, 6);
const todo1 = new Todo("blonny", 1, 3, 4, 6, 6);
TodoOperation.editTitle(todo, "New");

ProjectOperation.addTask(project, todo);
ProjectOperation.addTask(project, todo1);

Storage.saveProject(project);
Storage.readProjectItem(project);

const names = Storage.readProjectNames();
const nav = new NavBar("Menu");
nav.renderNavBar(names);
nav.renderNavBar(names);
import { Todo } from "./todo";
import { TodoOperation } from "./todo";
import { Project } from "./project";
import { ProjectOperation } from "./project";
import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { Controller } from "./controller";


const project = new Project("proj1");

const todo = new Todo("blonny", 1, 3, 4, 6, 6);
const todo1 = new Todo("blonny", 1, 3, 4, 6, 6);
TodoOperation.editTitle(todo, "New");

ProjectOperation.addTask(project, todo);
ProjectOperation.addTask(project, todo1);

Storage.saveProject(project);
Storage.readAllTask(project);

const names = Storage.readProjectNames();
const task = new TaskDisplay();

const project2 = new Project("proj2");

const todo2 = new Todo("bandt", 1, 3, 4, 6, 6);
const todo3 = new Todo("blon", 1, 3, 4, 6, 6);
TodoOperation.editTitle(todo, "New");

ProjectOperation.addTask(project2, todo2);
ProjectOperation.addTask(project2, todo3);

Storage.saveProject(project2);
Storage.readAllTask(project2);

const task2 = new TaskDisplay();

const controller = new Controller();

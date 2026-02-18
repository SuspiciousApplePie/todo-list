import { Todo } from "./todo";
import { TodoOperation } from "./todo";
import { Project } from "./project";
import { ProjectOperation } from "./project";
import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { Controller } from "./controller";


const project = new Project("proj1");

Storage.saveProject(project);
Storage.readAllTask(project);

const project2 = new Project("proj2");

Storage.saveProject(project2);
Storage.readAllTask(project2);

const controller = new Controller();

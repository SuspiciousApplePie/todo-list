import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { clearContent } from "./ui";
import { AddTaskDialog } from "./ui";
import { closeModal } from "./ui";
import { TodoOperation } from "./todo";
import { ProjectOperation } from "./project";

export class Controller {
    constructor() {
        this.main = document.querySelector(".main");
        this.nav = new NavBar("Menu");
        this.task = new TaskDisplay();
        this.addTaskDialog = new AddTaskDialog();
        this.setUpListener();
    }

    setUpListener() {
        this.main.addEventListener("click", (e) => {
            if (e.target.dataset.id) {
                clearContent(this.main);
                this.nav.renderNavBar(Storage.readProjectNames());
                this.task.renderTask(Storage.readAllTask(Storage.getProject(e.target.dataset.id)));
            } else if (e.target.id === "show-add-task-modal") {
                this.addTaskDialog.renderAddTaskDialog();
            } else if (e.target.id === "back-btn") {
                closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === "add-task-btn") {
                const projectId = e.target.parentElement.parentElement.previousElementSibling.dataset.projectId;
                const task = TodoOperation.addTask(this.addTaskDialog.readTaskDataInput());
                const project = Storage.getProject(projectId);
                ProjectOperation.addTask(project, task);
                Storage.saveProject(project);
                clearContent(this.main);
                this.nav.renderNavBar(Storage.readProjectNames());
                this.task.renderTask(Storage.readAllTask(Storage.getProject(projectId)));
            }
        })
    };
}
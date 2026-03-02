import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { clearContent } from "./ui";
import { AddTaskDialog } from "./ui";
import { closeModal } from "./ui";
import { TodoOperation } from "./todo";
import { Project, ProjectOperation } from "./project";
import { AddProjectDialog } from "./ui";
import { State } from "./state";
import { Todo } from "./todo";

export class Controller {
    constructor() {
        this.main = document.querySelector(".main");
        this.nav = new NavBar("Menu");
        this.task = new TaskDisplay();
        this.addTaskDialog = new AddTaskDialog();
        this.addProjectDialog = new AddProjectDialog();
        this.setUpListener();
    }

    setUpListener() {
        this.main.addEventListener("click", (e) => {
            if (e.target.dataset.id) {
                State.selectProject(this.main, this.nav, this.task, e.target.dataset.id);
            } else if (e.target.id === "show-add-task-modal") {
                State.showTaskModal(this.addTaskDialog)
            } else if (e.target.id === "back-btn") {
                State.closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === "add-task-btn") {
                const projectId = e.target.parentElement.parentElement.previousElementSibling.dataset.projectId;
                State.createNewTodo(projectId, this.addTaskDialog, this.nav, this.task, this.main);
            } else if (e.target.id === "show-project-modal") {
                State.showProjectModal(this.addProjectDialog);
            } else if (e.target.id === "close-add-project-modal") {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === "add-project-btn") {
                State.createNewProject(this.addProjectDialog, this.nav, this.task, this.main);
            }
        })
    };
}
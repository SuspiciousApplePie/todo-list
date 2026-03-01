import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { clearContent } from "./ui";
import { AddTaskDialog } from "./ui";
import { closeModal } from "./ui";
import { TodoOperation } from "./todo";
import { Project, ProjectOperation } from "./project";
import { AddProjectDialog } from "./ui";

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
                clearContent(this.main);
                this.nav.renderNavBar(Storage.readProjectNames());
                this.task.renderTask(Storage.readAllTask(Storage.getProject(e.target.dataset.id)));
            } else if (e.target.id === "show-add-task-modal") {
                this.addTaskDialog.renderAddTaskDialog();
            } else if (e.target.id === "back-btn") {
                const dialog = e.target.parentElement.parentElement;
                closeModal(dialog);
                dialog.remove();
            } else if (e.target.id === "add-task-btn") {
                const projectId = e.target.parentElement.parentElement.previousElementSibling.dataset.projectId;
                const task = TodoOperation.addTask(this.addTaskDialog.readTaskDataInput());
                const project = Storage.getProject(projectId);
                ProjectOperation.addTask(project, task);
                Storage.saveProject(project);
                clearContent(this.main);
                this.nav.renderNavBar(Storage.readProjectNames());
                this.task.renderTask(Storage.readAllTask(Storage.getProject(projectId)));
            } else if (e.target.id === "show-project-modal") {
                this.addProjectDialog.renderAddProjectDialog();
            } else if (e.target.id === "close-add-project-modal") {
                const dialog = e.target.parentElement.parentElement;
                closeModal(dialog);
                dialog.remove();
            } else if (e.target.id === "add-project-btn") {
                const project_name = this.addProjectDialog.readProjectInfo();
                const project = new Project(project_name);
                Storage.saveProject(project);
                clearContent(this.main);
                this.nav.renderNavBar(Storage.readProjectNames());
                this.task.renderTask(Storage.readAllTask(Storage.getProject(project.id)));
            }
        })
    };
}
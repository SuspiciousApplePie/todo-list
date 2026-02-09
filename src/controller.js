import { Storage } from "./storage";
import { NavBar } from "./ui";
import { TaskDisplay } from "./ui";
import { clearContent } from "./ui";
import { AddTaskDialog } from "./ui";

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
            } else if (e.target.id === "add-task-btn") {
                this.addTaskDialog.renderAddTaskDialog();
            }
        })
    };
}
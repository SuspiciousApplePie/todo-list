import { Project } from "./project";
import { Storage } from "./storage";

export class NavBar {
    constructor(title) {
        this.title = title;
        this.main = document.querySelector(".main");
        this.renderNavBar(Storage.readProjectNames());
    }

    renderNavBar(projects) {
        const nav = document.createElement("nav");
        nav.textContent = this.title;
        this.main.appendChild(nav);

        const ul = document.createElement("ul");

        projects.forEach(project => {
            const li = document.createElement("li");
            li.dataset.id = project.id;
            li.textContent = project.name;
            ul.appendChild(li);
        });

        nav.appendChild(ul);
    }
}

export class TaskDisplay {
    constructor() {
        this.title = "Tasks";
        this.main = document.querySelector(".main");
    }

    renderTask(tasks) {
        const taskWrapper = document.createElement("div"); 
        taskWrapper.dataset.projectId = tasks.id;
        taskWrapper.appendChild(this.#renderAddButton());
        this.main.appendChild(taskWrapper);
        tasks.task.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.appendChild(this.#renderName(task));
            taskWrapper.appendChild(taskElement);
        })
    }

    #renderAddButton() {
        const button = document.createElement("button");
        button.id = "add-task-btn";
        button.textContent = "Add Task";
        return button;
    }

    #renderName(task) {
        const element = document.createElement("h1");
        element.dataset.taskId = task.id;
        element.textContent = task.title;
        return element;
    }
}

export class AddTaskDialog {
    constructor() {
        this.title = "Add Task";
        this.main = document.querySelector(".main");
    }

    renderAddTaskDialog() {
        const dialog =  document.createElement("dialog");
        dialog.appendChild(this.#renderHeader());
        dialog.appendChild(this.#renderTaskNameField());
        this.main.appendChild(dialog);
        dialog.showModal();
    }

    #renderHeader() {
        const h1 = document.createElement("h1");
        h1.textContent = this.title;
        return h1;
    }

    #renderTaskNameField() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Task Title";
        label.htmlFor = "title";
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = "title";
        input.type = "text";
        input.minLength = 5;
        div.appendChild(input);

        return div;
    }
}

export function clearContent(parentElement) {
    parentElement.innerHTML = "";
}
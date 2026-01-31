import { Project } from "./project";

export class NavBar {
    constructor(title) {
        this.title = title;
        this.main = document.querySelector(".main");
    }

    renderNavBar(projects) {
        clearContent(this.main);
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
       tasks.task.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.dataset.projectId = tasks.id;
            taskElement.appendChild(this.#renderName(task));
            this.main.appendChild(taskElement);
        })
    }

    #renderName(task) {
        const element = document.createElement("h1");
        element.dataset.taskId = task.id;
        element.textContent = task.title;
        return element;
    }
}

export function clearContent(parentElement) {
    parentElement.innerHTML = "";
}
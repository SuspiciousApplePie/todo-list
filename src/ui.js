
export class NavBar {
    constructor(title) {
        this.title = title;
        this.main = document.querySelector(".main");
    }

    renderNavBar(names) {
        clearContent(this.main);
        const nav = document.createElement("nav");
        nav.textContent = this.title;
        this.main.appendChild(nav);

        const ul = document.createElement("ul");

        names.forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
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

    renderTask(parsedTasks) {
        parsedTasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.appendChild(this.#renderName(task.title));
            this.main.appendChild(taskElement);
        })
    }

    #renderName(task_name) {
        const element = document.createElement("h1");
        element.textContent = task_name;
        return element;
    }
}

export function clearContent(parentElement) {
    parentElement.innerHTML = "";
}
import { Storage } from "./storage";
import { todoDialogInfo, projectDialogInfo } from "./constants";

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

        this.#renderAddButton(ul);

        projects.forEach(project => {
            const li = document.createElement("li");
            li.dataset.id = project.id;
            li.textContent = project.name;
            ul.appendChild(li);
        });

        nav.appendChild(ul);
    }

    #renderAddButton(ul) {
        const button = document.createElement("button");
        button.textContent = "Add Project";
        button.id = projectDialogInfo.OPEN_PROJECT_MODAL;
        ul.appendChild(button);
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
        button.id = todoDialogInfo.OPEN_TODO_MODAL;
        button.textContent = todoDialogInfo.ADD_TODO_MODAL_TEXT;
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
        this.title = todoDialogInfo.ADD_TODO_MODAL_TEXT;
        this.main = document.querySelector(".main");
    }

    renderAddTaskDialog() {
        const dialog = this.createTaskDialog();
        dialog.showModal();
    }

    createTaskDialog() {
        const dialog =  document.createElement("dialog");
        dialog.id = todoDialogInfo.DIALOG_ID;
        dialog.appendChild(this.#renderHeader());
        dialog.appendChild(this.#renderTaskNameField());
        dialog.appendChild(this.#renderDescriptionField());
        dialog.appendChild(this.#renderDueDate());
        dialog.appendChild(this.#renderPriority());
        dialog.appendChild(this.#renderButtons());
        this.main.appendChild(dialog);
        return dialog; 
    }

    #renderHeader() {
        const h1 = document.createElement("h1");
        h1.textContent = this.title;
        return h1;
    }

    #renderTaskNameField() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Todo";
        label.htmlFor = "title";
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = "title";
        input.type = "text";
        input.minLength = 5;
        div.appendChild(input);

        return div;
    }

    #renderDescriptionField() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Description";
        label.htmlFor = "description";
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = "description";
        input.type = 30;
        div.appendChild(input);

        return div;
    }

    #renderDueDate() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Due Date";
        label.htmlFor = "due-date";
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = "due-date";
        input.type = "date";
        div.appendChild(input);

        return div;
    }

    #renderPriority() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Priority";
        label.htmlFor = "priority";
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = "priority";
        div.appendChild(input);

        return div;
    }

    #renderButtons() {
        const buttonInfo = [
            {
                text: "Back",
                buttonId: todoDialogInfo.CLOSE_MODAL_BUTTON,
            },
            {
                text: todoDialogInfo.ADD_TODO_MODAL_TEXT,
                buttonId: todoDialogInfo.ADD_TODO_BUTTON,

            }
        ];

        const div = document.createElement("div");

        buttonInfo.forEach(buttonObject => {
            const button = document.createElement("button");
            button.textContent = buttonObject.text;
            button.id = buttonObject.buttonId;
            div.appendChild(button);
        })

        return div;
    }

    readTaskDataInput() {
        return {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            dueDate: document.querySelector("#due-date").value,
            priority: document.querySelector("#priority").checked,
        }
    }
}

export class AddProjectDialog {
    constructor() {
        this.title = "Add Project";
        this.main = document.querySelector(".main");
    }

    renderAddProjectDialog() {
        const dialog = this.#createProjectDialog();
        dialog.showModal();   
    }

    #createProjectDialog() {
        const dialog = document.createElement("dialog");
        dialog.id = "create-project-modal";
        const h1 = document.createElement("h1");
        h1.textContent = "Add Project";
        dialog.appendChild(h1);
        dialog.appendChild(this.#createTitleInputDialog());
        dialog.appendChild(this.#renderButtons());
        this.main.appendChild(dialog);
        return dialog;
    }

    #createTitleInputDialog() {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.htmlFor = "project-title";
        label.textContent = "Title:";
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "30";
        input.id = label.htmlFor;
        div.appendChild(input);
         
        return div;
    }

    #renderButtons() {
        const buttonInfo = [
            {
                text: "Back",
                buttonId: projectDialogInfo.CLOSE_MODAL_BUTTON,
            },
            {
                text: "Add Project",
                buttonId: projectDialogInfo.ADD_PROJECT_BUTTON,

            }
        ];

        const div = document.createElement("div");

        buttonInfo.forEach(buttonObject => {
            const button = document.createElement("button");
            button.textContent = buttonObject.text;
            button.id = buttonObject.buttonId;
            div.appendChild(button);
        })

        return div;
    }

    readProjectInfo() {
        return document.querySelector("#project-title").value;
    }
}

export function clearContent(parentElement) {
    parentElement.innerHTML = "";
}

export function closeModal(modal) {
    modal.close();
}
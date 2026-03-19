import { Storage } from "./storage";
import { todoDialogInfo, projectDialogInfo, deleteTodoModal, editTodoModal, checklist } from "./constants";
import { format } from "date-fns";
import "./styles.css";

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
            taskElement.appendChild(this.#renderDueDate(task));
            taskElement.appendChild(this.#renderDescription(task));
            taskElement.appendChild(this.#renderChecklist(task));
            taskElement.appendChild(this.#renderEditButton());
            taskElement.appendChild(this.#renderDeleteButton());
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

    #renderDueDate(task) {
        const element = document.createElement("p");
        element.textContent = `Deadline:`;
        element.className = "due-date";

        if(task.dueDate) {
            const time = document.createElement("time");
            time.dateTime = format(task.dueDate, "yyyy-MM-dd");
            time.textContent = format(task.dueDate, "MMMM dd, yyyy");

            element.appendChild(time);
        } else {
            element.textContent += "Not set";
        }

        return element;
    }

    #renderDescription(task) {
        const element = document.createElement("p");
        element.textContent = task.description;
        element.className = "description";

        return element;
    }

    #renderChecklist(task) {
        const element = document.createElement("div");
        const h1 = document.createElement("h1");
        const wrapper = document.createElement("section");

        h1.textContent = "Checklist";

        element.appendChild(h1);
        element.appendChild(wrapper);

        if(task.checkList.length === 0) {
            wrapper.textContent = "No Checklist found.";
        } else {
            task.checkList.forEach(item => {
                const input = document.createElement("input");
                input.type = "checkbox";
                input.checked = item.status;
                input.name = item.id;
                input.disabled = true;

                const label = document.createElement("label");
                label.htmlFor = item.id;
                label.textContent = item.title;

                wrapper.appendChild(input);
                wrapper.appendChild(label);
            });
        }

        return element;
    }

    #renderDeleteButton() {
        const element = document.createElement("button");
        element.textContent = "Delete";
        element.className = deleteTodoModal.OPEN_DELETE_MODAL;
        return element;
    }

    #renderEditButton() {
        const element = document.createElement("button");
        element.textContent = "Edit";
        element.className = editTodoModal.OPEN_EDIT_TODO_MODAL;
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
        dialog.appendChild(ChecklistComponent.renderChecklistField());
        dialog.appendChild(ChecklistComponent.renderChecklistItems());
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

        const input = document.createElement("textarea");
        input.id = "description";
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
            checklist: document.querySelectorAll(".checklist-item"),
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
        dialog.id = projectDialogInfo.DIALOG_ID;
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

export class DeleteModal {
    constructor(type) {
        this.type = type;
        this.main = document.querySelector(".main");
    }

    renderDeleteModal(title, project, todo) {
        const dialog = document.createElement("dialog");
        dialog.dataset.projectId = project;
        dialog.dataset.todoId = todo;
        dialog.appendChild(this.#createHeader(title));
        dialog.appendChild(this.#createDeleteModalQuestion());
        dialog.appendChild(this.#createButtons());
        this.main.appendChild(dialog);
        dialog.showModal();
    }

    #createHeader(title) {
        const header = document.createElement("h1");
        header.textContent = `Delete ${title}`;
        return header;
    }

    #createDeleteModalQuestion() {
        const question = document.createElement("p");
        question.textContent = `Are you sure you want to delete this ${this.type}?`;
        return question;
    }

    #createButtons() {
        const buttonInfo = [
            {
                text: "No",
                buttonId: deleteTodoModal.CLOSE_DELETE_MODAL,
            },
            {
                text: "Yes",
                buttonId: deleteTodoModal.DELETE_TODO,

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
}

export class EditTodoModal {
    constructor() {
        this.main = document.querySelector(".main");
    }

    renderEditTodoModal(projectId, todoId, todo) {
        const dialog = this.#createEditTodoModal(todo);
        dialog.dataset.projectId = projectId;
        dialog.dataset.todoId = todoId;
        dialog.showModal();
    }

    #createEditTodoModal(todo) {
        const dialog = document.createElement("dialog");
        dialog.appendChild(this.#createHeader());
        dialog.appendChild(this.#createTitleInputDialog(todo.title));
        dialog.appendChild(this.#createDescriptionField(todo.description));
        dialog.appendChild(this.#createDueDate(todo.dueDate));
        dialog.appendChild(this.#createPriority(todo.priority));
        dialog.appendChild(ChecklistComponent.renderChecklistField());
        dialog.appendChild(ChecklistComponent.renderChecklistItems());
        dialog.appendChild(ChecklistComponent.renderExistingChecklist(todo.checkList));
        dialog.appendChild(this.#createButtons());
        this.main.appendChild(dialog);
        return dialog;
    }

    #createHeader() {
        const header = document.createElement("h1");
        header.textContent = "Edit Todo";
        return header;
    }

    #createTitleInputDialog(title) {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.htmlFor = "title";
        label.textContent = "Title:";
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "30";
        input.id = label.htmlFor;
        input.value = title;
        div.appendChild(input);
         
        return div;
    }

    #createDescriptionField(description) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Description";
        label.htmlFor = "description";
        div.appendChild(label);

        const input = document.createElement("textarea");
        input.id = "description";
        input.value = description;
        div.appendChild(input);

        return div;
    }

    #createDueDate(dueDate) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Due Date";
        label.htmlFor = "due-date";
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = "due-date";
        input.type = "date";
        if (dueDate) input.value = format(dueDate, "yyyy-MM-dd");
        div.appendChild(input);

        return div;
    }

    #createPriority(priority) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Priority";
        label.htmlFor = "priority";
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = "priority";
        input.checked = priority;
        div.appendChild(input);

        return div;
    }

    #createButtons() {
        const buttonInfo = [
            {
                text: "Close",
                buttonId: editTodoModal.CLOSE_EDIT_TODO_MODAL,
            },
            {
                text: "Save Changes",
                buttonId: editTodoModal.EDIT_TODO,

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

    readUpdatedTodoData() {
        return {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            dueDate: document.querySelector("#due-date").value,
            priority: document.querySelector("#priority").checked,
            newChecklistItem: document.querySelectorAll(".checklist-item"),
            existingChecklistItem: document.querySelectorAll(".existing-checklist-item"),
        }
    }
}

export class ChecklistComponent {
    static renderChecklistField() {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.textContent = "Add Checklist";
        label.htmlFor = "checklist";
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "text";
        input.id = label.htmlFor;
        div.appendChild(input);

        const button = document.createElement("button");
        button.textContent = "Add Checklist";
        button.id = checklist.ADD_CHECKLIST;
        div.appendChild(button);

        return div;
    }

    static renderChecklistItems() {
        const div = document.createElement("div");

        const h1 = document.createElement("h1");
        h1.textContent = "Checklist";
        div.appendChild(h1);

        const section = document.createElement("section");
        section.className = "checklist";
        div.appendChild(section);

        const ul = document.createElement("ul");
        ul.className = "checklist-items";
        section.appendChild(ul);

        return div;
    }

    static addChecklistItem(e) {
        const dialog = e.target.closest("dialog");
        const checklistItem = dialog.querySelector("#checklist");
        const ul = dialog.querySelector(".checklist-items");
        ChecklistComponent.#renderChecklistItem(ul, checklistItem.value)
        checklistItem.value = null;
        checklistItem.focus();
    }

    static #renderChecklistItem(ul, checklistItem) {
        const li = document.createElement("li");
        li.className = "checklist-item";

        const input = document.createElement("input");
        input.value = checklistItem;
        input.className = "checklist-title-field";
        input.name = "checklist";
        input.readOnly = true;
        li.appendChild(input);

        const editBtn = document.createElement("button")
        editBtn.textContent = "Edit";
        editBtn.className = checklist.EDIT_CHECKLIST;
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = checklist.DELETE_CHECKLIST;
        li.appendChild(deleteBtn);

        const saveBtn = document.createElement("button");
        saveBtn.className = "save-checklist hide";
        saveBtn.textContent = "Save";
        li.appendChild(saveBtn); 

        ul.appendChild(li);
    }

    static renderExistingChecklist(checklistInfo) {
        const div = document.createElement("div");
        const ul = document.createElement("ul");
        ul.className = "existing-checklist";

        checklistInfo.forEach(item => {
            const li = document.createElement("li");
            li.className = "existing-checklist-item";
            li.dataset.checkListId = item.id;

            const title = document.createElement("input");
            title.value = item.title;
            title.textContent = item.title;
            title.readOnly = true;
            title.className = "checklist-title-field";
            title.name = "checklist";
            li.appendChild(title);

            const input = document.createElement("input");
            input.type = "checkbox";
            input.className = "checklist-status";
            input.checked = item.status;
            li.appendChild(input);

            const editBtn = document.createElement("button")
            editBtn.textContent = "Edit";
            editBtn.className = checklist.EDIT_CHECKLIST;
            li.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = checklist.DELETE_CHECKLIST;
            li.appendChild(deleteBtn);

            const saveBtn = document.createElement("button");
            saveBtn.className = "save-checklist hide";
            saveBtn.textContent = "Save";
            li.appendChild(saveBtn); 

            ul.appendChild(li);
            div.appendChild(ul);
        })

        return div;
    }
}

export function clearContent(parentElement) {
    parentElement.innerHTML = "";
}

export function closeModal(modal) {
    modal.close();
}

export function createUndoToast(timeoutId) {
    const toast = document.createElement("div");
    toast.textContent = "Checklist has been deleted";
    toast.id = timeoutId;
    
    const button = document.createElement("button");
    button.textContent = "Undo";
    button.id = "undo";
    toast.appendChild(button);

    return toast;
}
import { parseISO } from "date-fns";

export class Todo {
    constructor(title, description, dueDate, priority, checkList) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = parseISO(dueDate);
        this.priority = priority;
        this.checkList = checkList;
    }
}

export class TodoOperation {
    static editTodo(todo, updatedTodoData) {
        todo.title = updatedTodoData.title;
        todo.description = updatedTodoData.description;
        if(updatedTodoData.dueDate) todo.dueDate = parseISO(updatedTodoData.dueDate);
        todo.priority = updatedTodoData.priority;

        return todo;
    }
}


export class Checklist {
    constructor(title, id=crypto.randomUUID(), status=false) {
        this.id = id;
        this.title = title;
        this.status = status;
    }

    static convertToChecklistObj(checklistData) {
        const checklist = [];
        checklistData.forEach(element => {
            const title = element.firstChild.value;
            const newChecklist = new Checklist(title);S
            checklist.push(newChecklist);
        });

        return checklist;
    }

    static convertToObj(checklistItems) {
        const checklist = [];
        checklistItems.forEach(element => {
            const id = element.dataset.checkListId;
            const title = element.querySelector(".checklist-title-field").value;
            const status = element.querySelector(".checklist-status").checked;
            checklist.push(new Checklist(title, id, status));
        })

        return checklist;
    }
}
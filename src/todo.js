import { parseISO } from "date-fns";
import { priorityLevel } from "./constants";

export class Todo {
    constructor(title, description, dueDate, priority=priorityLevel.LOW, checkList, id=crypto.randomUUID()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = checkList;
    }
}

export class TodoOperation {
    static editTodo(todo, updatedTodoData, checklist) {
        if(updatedTodoData.dueDate) parseISO(updatedTodoData.dueDate);
        const newTodo = new Todo(updatedTodoData.title, updatedTodoData.description, updatedTodoData.dueDate, updatedTodoData.priority, checklist, todo.id);
        return newTodo;
    }

    static getPriority(priorities) {
        let priority = null;
        priorities.forEach(field => {
            if(field.checked) priority = field.value;
        })

        return priority;
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
            const newChecklist = new Checklist(title);
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
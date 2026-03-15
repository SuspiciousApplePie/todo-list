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
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.status = false;
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
}
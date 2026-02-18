import { isBefore } from "date-fns";

export class Todo {
    constructor(title, description, dueDate, priority, notes, checkList) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }
}

export class TodoOperation {
    static addTask(todo) {
        return new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
    }
    static editTitle(todo, title) {
        todo.title = title;
    }

}


export class Todo {
    constructor(title, description, dueDate, priority, notes, checkList) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }
}

export class TodoOperation {
    static editTitle(todo, title) {
        todo.title = title;
    }
}


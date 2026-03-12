import { parseISO } from "date-fns";

export class Todo {
    constructor(title, description, dueDate, priority, notes, checkList) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = parseISO(dueDate);
        this.priority = priority;
        this.notes = notes;
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


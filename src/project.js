export class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.toDos = [];
    }
}

export class ProjectOperation {
    static addTask(project, toDo) {
        project.toDos.push(toDo);
    }
}
export class Storage {
    static saveProject(project) {
        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static readAllTask(project) {
        const parsedTasks = JSON.parse(localStorage.getItem(project.id)).toDos;
        return { id: project.id, task: parsedTasks };
    }

    static getProject(id) {
        const project = JSON.parse(localStorage.getItem(id));
        return project;
    }

    static readProjectNames() {
        let names = [];
        Object.values(localStorage).forEach(item => {
            let parsedItem = JSON.parse(item);
            names.push(parsedItem);
        });

        return names;
    }

    static deleteProject(project) {
        localStorage.removeItem(project.id);
    }
}
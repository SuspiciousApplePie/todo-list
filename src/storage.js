import { TodoOperation } from "./todo";

export class Storage {
    static saveProject(project) {
        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static readProjectItem(project) {
        const projectObj = JSON.parse(localStorage.getItem(project.id));
    }

    static readProjectNames() {
        let names = [];
        Object.values(localStorage).forEach(item => {
            let parsedItem = JSON.parse(item);
            names.push(parsedItem.name);
        });

        return names;
    }

    static deleteProject(project) {
        localStorage.removeItem(project.id);
    }
}
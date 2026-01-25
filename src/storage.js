import { TodoOperation } from "./todo";

export class Storage {
    static saveProject(project) {
        localStorage.setItem(project.id, JSON.stringify(project));
    }

    static readProject(project) {
        const projectObj = JSON.parse(localStorage.getItem(project.id));
        const tasks = projectObj["toDos"];
        // Display here
    }

    static deleteProject(project) {
        localStorage.removeItem(project.id);
    }
}
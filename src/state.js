import { Storage } from "./storage";
import { clearContent, closeModal } from "./ui";
import { Project, ProjectOperation } from "./project";
import { Todo } from "./todo";

export class State {
    static selectProject(main, nav, task, projectId) {
        clearContent(main);
        nav.renderNavBar(Storage.readProjectNames());
        task.renderTask(Storage.readAllTask(Storage.getProject(projectId)));
    }

    static showTodoModal(addTaskDialog) {
        addTaskDialog.renderAddTaskDialog();
    }

    static closeModal(dialog) {
        closeModal(dialog);
        dialog.remove();
    }

    static createNewTodo(projectId, addTaskDialog, nav, task, main) {
        const todoData = addTaskDialog.readTaskDataInput();
        const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
        const project = Storage.getProject(projectId);
        ProjectOperation.addTask(project, todo);
        Storage.saveProject(project);
        clearContent(main);
        nav.renderNavBar(Storage.readProjectNames());
        task.renderTask(Storage.readAllTask(Storage.getProject(projectId)));
    }

    static showProjectModal(addProjectDialog) {
        addProjectDialog.renderAddProjectDialog();
    }

    static createNewProject(addProjectDialog, nav, task, main) {
        const project_name = addProjectDialog.readProjectInfo();
        const project = new Project(project_name);
        Storage.saveProject(project);
        clearContent(main);
        nav.renderNavBar(Storage.readProjectNames());
        task.renderTask(Storage.readAllTask(Storage.getProject(project.id)));
    }

    static showDeleteModal(deleteTodoModal, title, project, todo) {
        deleteTodoModal.renderDeleteModal(title, project, todo);
    }

    static deleteTodo(projectId, todoId, nav, task, main) {
        const project = Storage.getProject(projectId);
        const updatedTodo = Storage.deleteTodo(project.toDos, todoId)
        project.toDos = updatedTodo;
        Storage.saveProject(project);
        clearContent(main);
        nav.renderNavBar(Storage.readProjectNames());
        task.renderTask(Storage.readAllTask(Storage.getProject(project.id)));
    }
}
import { Storage } from "./storage";
import { clearContent, closeModal, EditTodoModal, createUndoToast } from "./ui";
import { Project, ProjectOperation } from "./project";
import { Todo, TodoOperation, Checklist } from "./todo";

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
        const checklist = Checklist.convertToChecklistObj(todoData.checklist);
        const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, checklist);
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

    static showEditTodoModal(todoId, projectId, editTaskDialog) {
        const project = Storage.getProject(projectId);
        const selectedTodo = Storage.readTodo(project.toDos, todoId);
        editTaskDialog.renderEditTodoModal(projectId, todoId, selectedTodo);
    }

    static editTodo(projectId, todoId, editTaskDialog, nav, task, main) {
        const editedTodoData = editTaskDialog.readUpdatedTodoData();
        const project = Storage.getProject(projectId);
        const selectedTodo = Storage.readTodo(project.toDos, todoId);
        const editedTodo = TodoOperation.editTodo(selectedTodo, editedTodoData);
        const updatedTodo = Storage.updateProjectTodoList(project.toDos, editedTodo, todoId);
        project.toDos = updatedTodo;
        Storage.saveProject(project);
        clearContent(main);
        nav.renderNavBar(Storage.readProjectNames());
        task.renderTask(Storage.readAllTask(Storage.getProject(project.id)));
    }

    static addChecklistItem(addTodoDialog) {
        addTodoDialog.addChecklistItem();
    }

    static deleteChecklistItem(e) {
        e.target.parentElement.remove();
    }

    static editChecklist(e) {
        const input = e.target.previousElementSibling;
        input.readOnly = false;
        e.target.disabled = true;
        e.target.nextElementSibling.nextElementSibling.classList.toggle("hide");
    }

    static saveChecklist(e) {
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.readOnly = true;
        e.target.previousElementSibling.previousElementSibling.disabled = false;
        e.target.classList.toggle("hide");
    }
}
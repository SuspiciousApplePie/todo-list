import { NavBar, TaskDisplay, AddTaskDialog, AddProjectDialog, EditTodoModal, DeleteModal } from "./ui";
import { State } from "./state";
import { todoDialogInfo, projectDialogInfo } from "./constants";

export class Controller {
    constructor() {
        this.main = document.querySelector(".main");
        this.nav = new NavBar("Menu");
        this.task = new TaskDisplay();
        this.addTaskDialog = new AddTaskDialog();
        this.addProjectDialog = new AddProjectDialog();
        this.editTodoDialog = new EditTodoModal();
        this.deleteTodoDialog = new DeleteModal("Todo");
        this.setUpListener();
    }

    setUpListener() {
        this.main.addEventListener("click", (e) => {
            if (e.target.dataset.id) {
                State.selectProject(this.main, this.nav, this.task, e.target.dataset.id);
            } else if (e.target.id === todoDialogInfo.OPEN_TODO_MODAL) {
                State.showTodoModal(this.addTaskDialog)
            } else if (e.target.id === todoDialogInfo.CLOSE_MODAL_BUTTON) {
                State.closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === todoDialogInfo.ADD_TODO_BUTTON) {
                const projectId = e.target.parentElement.parentElement.previousElementSibling.dataset.projectId;
                State.createNewTodo(projectId, this.addTaskDialog, this.nav, this.task, this.main);
            } else if (e.target.id === projectDialogInfo.OPEN_PROJECT_MODAL) {
                State.showProjectModal(this.addProjectDialog);
            } else if (e.target.id === projectDialogInfo.CLOSE_MODAL_BUTTON) {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === projectDialogInfo.ADD_PROJECT_BUTTON) {
                State.createNewProject(this.addProjectDialog, this.nav, this.task, this.main);
            } else if (e.target.className === "open-delete-todo-modal") {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.previousElementSibling.previousElementSibling.dataset.taskId;
                const title = e.target.previousElementSibling.previousElementSibling.textContent;
                State.showDeleteModal(this.deleteTodoDialog, title, project, todo);
            } else if (e.target.id === "close-delete-modal") {
                State.closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === "delete") {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.deleteTodo(projectId, todoId, this.nav, this.task, this.main);
            } else if (e.target.className === "open-edit-todo-modal") {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.previousElementSibling.dataset.taskId;
                State.showEditTodoModal(todo, project, this.editTodoDialog);
            } else if (e.target.id === "close-edit-todo-modal") {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === "edit-todo") {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.editTodo(projectId, todoId, this.editTodoDialog, this.nav, this.task, this.main);
            }
        })
    };
}
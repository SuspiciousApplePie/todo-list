import { NavBar, TaskDisplay, AddTaskDialog, AddProjectDialog, EditTodoModal, DeleteModal, createUndoToast } from "./ui";
import { State } from "./state";
import { todoDialogInfo, projectDialogInfo, deleteTodoModal, editTodoModal, checklist } from "./constants";
import { add } from "date-fns";

export class Controller {
    constructor() {
        this.main = document.querySelector(".main");
        this.nav = new NavBar("Menu");
        this.task = new TaskDisplay();
        this.addTaskDialog = new AddTaskDialog();
        this.addProjectDialog = new AddProjectDialog();
        this.editTodoDialog = new EditTodoModal();
        this.deleteTodoDialog = new DeleteModal("Todo");
        this.pendingDeletion = { element: null, timeoutId: null };
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
            } else if (e.target.className === deleteTodoModal.OPEN_DELETE_MODAL) {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.previousElementSibling.previousElementSibling.dataset.taskId;
                const title = e.target.previousElementSibling.previousElementSibling.textContent;
                State.showDeleteModal(this.deleteTodoDialog, title, project, todo);
            } else if (e.target.id === deleteTodoModal.CLOSE_DELETE_MODAL) {
                State.closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === deleteTodoModal.DELETE_TODO) {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.deleteTodo(projectId, todoId, this.nav, this.task, this.main);
            } else if (e.target.className === editTodoModal.OPEN_EDIT_TODO_MODAL) {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.previousElementSibling.dataset.taskId;
                State.showEditTodoModal(todo, project, this.editTodoDialog);
            } else if (e.target.id === editTodoModal.CLOSE_EDIT_TODO_MODAL) {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === editTodoModal.EDIT_TODO) {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.editTodo(projectId, todoId, this.editTodoDialog, this.nav, this.task, this.main);
            } else if (e.target.id === checklist.ADD_CHECKLIST) {
                State.addChecklistItem(this.addTaskDialog);
            } else if (e.target.className === checklist.DELETE_CHECKLIST) {
                const undoToast = createUndoToast();

                e.target.parentElement.parentElement.parentElement.parentElement.appendChild(undoToast);
                this.pendingDeletion.element = e.target.parentElement;
                this.pendingDeletion.element.classList.toggle("hide");

                this.pendingDeletion.timeoutId = setTimeout(() => {
                    State.deleteChecklistItem(e);
                    undoToast.remove();
                    this.pendingDeletion.timeoutId = null;
                    this.pendingDeletion.element = null;
                }, 5000);
            } else if (e.target.id === "undo") {
                this.pendingDeletion.element.classList.toggle("hide");
                clearTimeout(this.pendingDeletion.timeoutId);
                e.target.parentElement.remove();
                this.pendingDeletion.timeoutId = null;
                this.pendingDeletion.element = null;
            } else if (e.target.className === checklist.EDIT_CHECKLIST) {
                State.editChecklist(e);
            } else if (e.target.classList.contains(checklist.SAVE_CHECKLIST)) {
                State.saveChecklist(e);
            }
        })
    };
}
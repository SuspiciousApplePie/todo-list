import { NavBar, TaskDisplay, AddTaskDialog, AddProjectDialog, EditTodoModal, DeleteModal, createUndoToast } from "./ui";
import { State } from "./state";
import { todoDialogInfo, projectDialogInfo, deleteTodoModal, editTodoModal, checklist, viewButton } from "./constants";
import { add } from "date-fns";

export class Controller {
    constructor() {
        this.main = document.querySelector(".main");
        this.nav = new NavBar("Projects");
        this.task = new TaskDisplay();
        this.addTaskDialog = new AddTaskDialog();
        this.addProjectDialog = new AddProjectDialog();
        this.editTodoDialog = new EditTodoModal();
        this.deleteTodoDialog = new DeleteModal("Todo");
        this.pendingDeletion = [];
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
            } else if (e.target.closest(`#${projectDialogInfo.OPEN_PROJECT_MODAL}`)) {
                State.showProjectModal(this.addProjectDialog);
            } else if (e.target.id === projectDialogInfo.CLOSE_MODAL_BUTTON) {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === projectDialogInfo.ADD_PROJECT_BUTTON) {
                State.createNewProject(this.addProjectDialog, this.nav, this.task, this.main);
            } else if (e.target.className === deleteTodoModal.OPEN_DELETE_MODAL) {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.parentElement.querySelector("h1").dataset.taskId;
                const title = e.target.parentElement.querySelector("h1").textContent;
                State.showDeleteModal(this.deleteTodoDialog, title, project, todo);
            } else if (e.target.id === deleteTodoModal.CLOSE_DELETE_MODAL) {
                State.closeModal(e.target.parentElement.parentElement);
            } else if (e.target.id === deleteTodoModal.DELETE_TODO) {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.deleteTodo(projectId, todoId, this.nav, this.task, this.main);
            } else if (e.target.className === editTodoModal.OPEN_EDIT_TODO_MODAL) {
                const project = e.target.parentElement.parentElement.dataset.projectId;
                const todo = e.target.parentElement.querySelector("h1").dataset.taskId;
                State.showEditTodoModal(this.main, this.nav, todo, project, this.editTodoDialog);
            } else if (e.target.id === editTodoModal.CLOSE_EDIT_TODO_MODAL) {
                const dialog = e.target.parentElement.parentElement;
                State.closeModal(dialog);
            } else if (e.target.id === editTodoModal.EDIT_TODO) {
                const projectId = e.target.parentElement.parentElement.dataset.projectId;
                const todoId = e.target.parentElement.parentElement.dataset.todoId;
                State.editTodo(projectId, todoId, this.editTodoDialog, this.nav, this.task, this.main);
            } else if (e.target.id === checklist.ADD_CHECKLIST) {
                State.addChecklistItem(e);
            } else if (e.target.className === checklist.DELETE_CHECKLIST) {
                const pendingElement = e.target.closest("li");
                pendingElement.classList.toggle("hide");

                const timeoutId = setTimeout(() => {
                    State.deleteChecklistItem(e);
                    const pendingDeletion = this.pendingDeletion.filter(pending => {
                        if (pending.timeoutId === timeoutId) {
                            return;
                        }
                        return pending;
                    });
                    undoToast.remove();
                    this.pendingDeletion = pendingDeletion;
                }, 5000);
                const undoToast = createUndoToast(timeoutId);
                e.target.closest("dialog").appendChild(undoToast);
                this.pendingDeletion.push({timeoutId: timeoutId, pendingElement: pendingElement})

            } else if (e.target.id === "undo") {
                const pendingDeletion = this.pendingDeletion.filter(pending => {
                    if (pending.timeoutId === Number(e.target.parentElement.id)) {
                        clearTimeout(pending.timeoutId);
                        pending.pendingElement.classList.toggle("hide");
                        e.target.parentElement.remove();
                        return;
                    }
                    return pending;
                });
                this.pendingDeletion = pendingDeletion;
            } else if (e.target.className === checklist.EDIT_CHECKLIST) {
                State.editChecklist(e);
            } else if (e.target.classList.contains(checklist.SAVE_CHECKLIST)) {
                State.saveChecklist(e);
            } else if (e.target.classList.contains(viewButton.VIEW_TODO)) {
                State.viewTodoDetails(e);
            }
        })
    };
}
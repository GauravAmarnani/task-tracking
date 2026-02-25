class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    generateId() {
        return crypto.randomUUID();
    }

    addTask(text, dueTime) {
        const task = {
            id: this.generateId(),
            text,
            completed: false,
            dueTime,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(task);
        this.save();
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        task.completed = !task.completed;
        this.save();
    }

    editTask(id, newText, newDueTime) {
        const task = this.tasks.find(t => t.id === id);
        task.text = newText;
        task.dueTime = newDueTime;
        this.save();
    }

    getTasks(completed) {
        return this.tasks.filter(t => t.completed === completed);
    }
}

const taskManager = new TaskManager();

function renderTasks(completed) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const tasks = taskManager.getTasks(completed);

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = () => {
            taskManager.toggleTask(task.id);
            renderTasks(completed);
        };

        const span = document.createElement("span");
        span.textContent = task.text +
            (task.dueTime ? ` (Due: ${new Date(task.dueTime).toLocaleString()})` : "");
        if (task.completed) span.classList.add("completed");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const newText = prompt("Edit task:", task.text);
            const newTime = prompt("Edit due time (YYYY-MM-DDTHH:MM)", task.dueTime || "");
            if (newText) {
                taskManager.editTask(task.id, newText, newTime);
                renderTasks(completed);
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            taskManager.deleteTask(task.id);
            renderTasks(completed);
        };

        li.append(checkbox, span, editBtn, deleteBtn);
        list.appendChild(li);
    });
}

/* Dark Mode */

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode",
        document.body.classList.contains("dark"));
}

function initDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
}

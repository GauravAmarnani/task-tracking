/* =========================
   RENDER TASKS
========================= */

function renderTasks(completed) {
    const list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    const tasks = taskManager.getTasks(completed);

    if (tasks.length === 0) {
        const emptyState = document.createElement("p");
        emptyState.textContent = completed
            ? "No completed tasks yet."
            : "No pending tasks. You're all caught up 🎉";
        emptyState.style.color = "var(--muted)";
        emptyState.style.marginTop = "20px";
        list.appendChild(emptyState);
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement("li");

        /* ===== Left Section (Checkbox + Text) ===== */

        const leftSection = document.createElement("div");
        leftSection.style.display = "flex";
        leftSection.style.alignItems = "center";
        leftSection.style.flex = "1";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            taskManager.toggleTask(task.id);
            renderTasks(completed);
        });

        const span = document.createElement("span");

        const dueText = task.dueTime
            ? ` (Due: ${new Date(task.dueTime).toLocaleString()})`
            : "";

        span.textContent = task.text + dueText;

        if (task.completed) {
            span.classList.add("completed");
        }

        leftSection.appendChild(checkbox);
        leftSection.appendChild(span);

        /* ===== Button Group ===== */

        const btnGroup = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText === null) return;

            const trimmedText = newText.trim();
            if (!trimmedText) {
                alert("Task cannot be empty.");
                return;
            }

            const newTime = prompt(
                "Edit due time (YYYY-MM-DDTHH:MM)",
                task.dueTime || ""
            );

            taskManager.editTask(task.id, trimmedText, newTime);
            renderTasks(completed);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("danger");

        deleteBtn.addEventListener("click", () => {
            const confirmDelete = confirm("Delete this task?");
            if (!confirmDelete) return;

            taskManager.deleteTask(task.id);
            renderTasks(completed);
        });

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        /* ===== Assemble ===== */

        li.appendChild(leftSection);
        li.appendChild(btnGroup);

        list.appendChild(li);
    });
}


/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

function initDarkMode() {
    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {
        document.body.classList.add("dark");
    }
}

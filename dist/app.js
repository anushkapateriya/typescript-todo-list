"use strict";
// Get HTML elements
const taskNameInput = document.getElementById("taskName");
const dueDateInput = document.getElementById("dueDate");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Display tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        if (task.completed) {
            taskInfo.classList.add("completed");
        }
        taskInfo.innerHTML = `
            <strong>${task.name}</strong>
            <br>
            <small>Due: ${task.dueDate}</small>
        `;
        // Checkbox toggle
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter((item) => item.id !== task.id);
            saveTasks();
            renderTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(taskInfo);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
// Add new task
addTaskButton.addEventListener("click", () => {
    const name = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    if (name === "" || dueDate === "") {
        return;
    }
    const newTask = {
        id: Date.now(),
        name: name,
        dueDate: dueDate,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    // Clear inputs
    taskNameInput.value = "";
    dueDateInput.value = "";
});
// Display saved tasks when page loads
renderTasks();

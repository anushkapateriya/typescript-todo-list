interface Task {
    id: number;
    name: string;
    dueDate: string;
    completed: boolean;
}


// Get HTML elements
const taskNameInput = document.getElementById("taskName") as HTMLInputElement;
const dueDateInput = document.getElementById("dueDate") as HTMLInputElement;
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;


// Load tasks from localStorage
let tasks: Task[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);


// Save tasks to localStorage
function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display tasks
function renderTasks(): void {

    taskList.innerHTML = "";

    tasks.forEach((task: Task) => {

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
        checkbox.addEventListener("change", (): void => {

            task.completed = checkbox.checked;

            saveTasks();
            renderTasks();
        });


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", (): void => {

            tasks = tasks.filter(
                (item: Task): boolean => item.id !== task.id
            );

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
addTaskButton.addEventListener("click", (): void => {

    const name: string = taskNameInput.value.trim();
    const dueDate: string = dueDateInput.value;


    if (name === "" || dueDate === "") {
        return;
    }


    const newTask: Task = {
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
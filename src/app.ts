const taskForm = document.querySelector<HTMLFormElement>(".form");

const formInput = document.querySelector<HTMLInputElement>(".form-input");

const taskListElement = document.querySelector<HTMLUListElement>(".list");

type Task = {
    description: string;
    isCompleted: boolean;
};

const loadTasks = (): Task[] => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
};

const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

taskForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskDescription = formInput?.value;
    if (taskDescription) {
        const task: Task = {
            description: taskDescription,
            isCompleted: false,
        };
        addTask(task);
        renderTask(task);
        updateStorage();
        formInput.value = "";
        return;
    }
    alert("A description is required !");
});

function addTask(task: Task): void {
    tasks.push(task);
}

function renderTask(task: Task): void {
    const taskElement = document.createElement("li");
    taskElement.textContent = task.description;

    //checkbox
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.isCompleted;

    //toggle checkbox
    taskCheckbox.addEventListener("change", () => {
        task.isCompleted = !task.isCompleted;
        updateStorage();
    });

    taskElement.appendChild(taskCheckbox);
    taskListElement?.appendChild(taskElement);
}

function updateStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

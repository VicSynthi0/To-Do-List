let tasks = [];

const taskInput = document.querySelector(".task-input") ;
const addTaskBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-list");

function renderTasks (){
  taskList.innerHTML = "";

  tasks.forEach (function (task){
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
    <label style="display: flex; align-items: center; gap: 8px;">
    <input type="checkbox" class="toggle-check" data-id="${task.id}" ${task.completed ? "checked" : ""}>
    <span class="task-title" style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
    ${task.title}
    </span>
    </label>
    <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;

taskList.appendChild(taskItem);
  });
}


addTaskBtn.addEventListener("click" ,function () {
  const title = taskInput.value.trim();

  if (title === ""){
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
});


taskList.addEventListener("click", function (event) {

  if (event.target.classList.contains("delete-btn")) {
    const idtoDelete = Number(event.target.dataset.id);
    tasks = tasks.filter(task => task.id !== idtoDelete);
    renderTasks();
  }

if (event.target.classList.contains("toggle-check")) {
    const idToToggle = Number(event.target.dataset.id);
    const task = tasks.find(task => task.id === idToToggle);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
}
});
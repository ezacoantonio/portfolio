
// Get the input fields and the task list
const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("descriptionInput");
const dueDateInput = document.getElementById("dueDateInput");
const taskList = document.getElementById("taskList");

// Add a new task to the list and save it to localStorage
function addTask() {
  // Create a new task item with its description and due date
  const taskName = taskInput.value;
  const description = descriptionInput.value;
  const dueDate = dueDateInput.value;
  const task = document.createElement("li");
  const taskContent = document.createElement("div");
  taskContent.classList.add("taskContent");
  task.innerHTML = `<input type="checkbox"><span class="taskName">${taskName}</span>`;
  if (description) {
    const descriptionElem = document.createElement("div");
    descriptionElem.classList.add("description");
    descriptionElem.innerText = description;
    taskContent.appendChild(descriptionElem);
  }
  if (dueDate) {
    const dueDateElem = document.createElement("div");
    dueDateElem.classList.add("dueDate");
    dueDateElem.innerText = dueDate;
    taskContent.appendChild(dueDateElem);
  }
  task.appendChild(taskContent);

  // Add the task to the task list
  taskList.appendChild(task);

  // Add the task to localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    taskName,
    description,
    dueDate,
    completed: false
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear the input fields
  taskInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
}

// Toggle the completed state of a task, update the task in localStorage, and remove it from localStorage if completed
function toggleCompleted(event) {
  const taskItem = event.target.closest("li");
  if (event.target.type === "checkbox") {
    taskItem.classList.toggle("completed");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(task => task.taskName === taskItem.querySelector(".taskName").textContent);
    if (index !== -1) {
      tasks[index].completed = taskItem.classList.contains("completed");
      localStorage.setItem("tasks", JSON.stringify(tasks));
      if (tasks[index].completed) {
        const checkbox = event.target;
        checkbox.checked = true;
        setTimeout(() => {
          if (checkbox.checked) {
            taskItem.remove();
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }
        }, 3500);
      }
    }
  }
}

// Toggle the completed state of a task and update it in localStorage
function toggleCompleted(event) {
  const taskItem = event.target.closest("li");
  if (event.target.type === "checkbox") {
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
      const checkbox = event.target;
      checkbox.checked = true;
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = Array.from(taskList.children).indexOf(taskItem);
      tasks[index].completed = true;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTimeout(() => {
        if (checkbox.checked) {
          taskItem.remove();
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      }, 3500);
    } else {
      const checkbox = event.target;
      checkbox.checked = false;
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = Array.from(taskList.children).indexOf(taskItem);
      tasks[index].completed = false;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}



// Toggle the completed state of a task
function toggleCompleted(event) {
  const taskItem = event.target.closest("li");
  if (event.target.type === "checkbox") {
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
      const checkbox = event.target;
      checkbox.checked = true;
      setTimeout(() => {
        if (checkbox.checked) {
          taskItem.remove();
          const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
          const updatedTasks = tasks.filter(task => task.taskName !== taskItem.querySelector(".taskName").innerText);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
      }, 3500);
    }
  }
}


// Load tasks from localStorage on page load
window.onload = function() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (const task of tasks) {
    // Create a new task item with its description and due date
    const taskName = task.taskName;
    const description = task.description;
    const dueDate = task.dueDate;
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
    taskItem.innerHTML = `<input type="checkbox"><span class="taskName">${taskName}</span>`;
    if (description) {
      const descriptionElem = document.createElement("div");
      descriptionElem.classList.add("description");
      descriptionElem.innerText = description;
      taskItem.appendChild(descriptionElem);
    }
    if (dueDate) {
      const dueDateElem = document.createElement("div");
      dueDateElem.classList.add("dueDate");
      dueDateElem.innerText = dueDate;
      taskItem.appendChild(dueDateElem);
    }
    if (task.completed) {
      taskItem.classList.add("completed");
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.checked = true;
    }

    // Add the task item to the task list
    taskList.appendChild(taskItem);
  }
}





// // Toggle the completed state of a task
// function toggleCompleted(event) {
//   const taskItem = event.target.closest("li");
//   if (event.target.type === "checkbox") {
//     taskItem.classList.toggle("completed");
//     if (taskItem.classList.contains("completed")) {
//       const checkbox = event.target;
//       checkbox.checked = true;
//       setTimeout(() => {
//         if (checkbox.checked) {
//           taskItem.remove();
//         }
//       }, 3500);
//     }
//   }
// }

// Add a click event listener to the add button
document.getElementById("addButton").addEventListener("click", addTask);

// Add a click event listener to the task list to handle toggling completed state
taskList.addEventListener("click", toggleCompleted);

//=============================================================================================


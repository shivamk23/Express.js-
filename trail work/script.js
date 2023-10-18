const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");

function addTask() {
  const task = taskInput.value;
  if (task.trim() === "") {
    return;
  }

  fetch("/addTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.text())
    .then(() => {
      taskInput.value = "";
      fetchTasks();
    })
    .catch((error) => console.error(error));
}

function deleteTask(index) {
  fetch(`/deleteTask/${index}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchTasks();
    })
    .catch((error) => console.error(error));
}

function fetchTasks() {
  fetch("/allTasks")
    .then((response) => response.json())
    .then((tasks) => {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.task;
        li.innerHTML += `<button onclick="deleteTask(${index})">Delete</button>`;
        taskList.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
}

// Fetch tasks when the page loads
fetchTasks();

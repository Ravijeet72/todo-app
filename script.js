// Select DOM elements
const taskForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

// Add task to DOM
function addTask(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load and render tasks
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTask(task));
}

// Delete task from DOM and localStorage
function deleteTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.trim();
  li.remove();

  const tasks = getTasks().filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  let task = {
    title,
    description
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title === title) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    tasksView.innerHTML = tasksView.innerHTML += `<div class="mt-12 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl dark:bg-gray-800 dark:border-gray-700">
    <div>
      <p class="text-sm md:text-base lg:text-lg">
        ${title} - ${description}
        <a onclick="deleteTask('${title}')" class="ml-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
          Delete
        </a>
      </p>
    </div>
  </div>`;
  }
}

getTasks();
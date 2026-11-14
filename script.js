const button = document.getElementById('add-btn');
const nameInput = document.getElementById('task-name');
const dateInput = document.getElementById('task-date');
const list = document.getElementById('task-list');

function renderTask(task)
{
    const newTask = document.createElement('li');

    newTask.addEventListener('click', function(){
         newTask.classList.toggle('completed');

         let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
         let updatedTasks = savedTasks.map(function(t)
         {
            if (t.id === task.id)
            {
                t.completed = !t.completed;
            }
            return t;
         });

         localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    });

    newTask.classList.add('task-item');

    if (task.completed == true)
    {
        newTask.classList.add('completed');
    }

    newTask.textContent = task.name + " (до " + task.date + ")";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';

    deleteBtn.addEventListener('click', function()
{
    newTask.remove();

    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let updatedTasks = savedTasks.filter(function(t)
    {
        return t.id !== task.id;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
});

    newTask.appendChild(deleteBtn);

      list.appendChild(newTask);
}

button.addEventListener('click', function()
{
    const taskName = nameInput.value;
    const taskDate = dateInput.value;
    const taskObject = { id: Date.now(), name: taskName, date: taskDate, completed: false};

    if (taskName == '' || taskDate == '')
    {
        alert('Пожалуйста введите название и дату');

        return;
    }

    renderTask(taskObject);

  

    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    nameInput.value = '';
    dateInput.value = '';
});

 let tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];

    tasksFromStorage.forEach(function(task)
        {
            renderTask(task);
        }
    );
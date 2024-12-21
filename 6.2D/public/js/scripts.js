// RESTful API base URL
const API_URL = '/api/todos';

// Fetch and display todos on home page
if (document.getElementById('todo-list')) {
  fetchTodos();
}

function fetchTodos() {
  fetch(API_URL)
    .then(response => response.json())
    .then(todos => renderTodos(todos))
    .catch(error => console.error('Error fetching todos:', error));
}

function renderTodos(todos) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const card = document.createElement('div');
    card.className = 'col s12 m6';
    card.innerHTML = `
      <div class="card">
        <div class="card-content">
          <label>
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete('${todo._id}', this.checked)" />
            <span>${todo.title}</span>
          </label>
          <p>${todo.description}</p>
        </div>
        <div class="card-action">
          <button class="btn red lighten-1" onclick="confirmDelete('${todo._id}')">Delete</button>
          <button class="btn blue lighten-1" onclick="editTodo('${todo._id}')">Edit</button>
        </div>
      </div>
    `;
    todoList.appendChild(card);
  });
}

function toggleComplete(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  })
    .then(() => M.toast({ html: 'Task updated successfully!', classes: 'green' }))
    .catch(error => console.error('Error updating todo:', error));
}

function confirmDelete(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(id);
  }
}

function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => {
      fetchTodos();
      M.toast({ html: 'Task deleted successfully!', classes: 'green' });
    })
    .catch(error => console.error('Error deleting todo:', error));
}

function editTodo(id) {
  window.location.href = `/todos/${id}`;
}

// Handle form submission for creating/editing a todo
if (document.getElementById('create-todo-form')) {
  const form = document.getElementById('create-todo-form');
  const todoId = window.location.pathname.split('/todos/')[1];

  const submitButton = document.querySelector('button[type="submit"]');
  const h1 = document.querySelector('h1[id="create-edit-title"]');

  if (todoId) {
    fetch(`${API_URL}/${todoId}`)
      .then(response => response.json())
      .then(todo => {
        document.getElementById('task-name').value = todo.title;
        document.getElementById('task-desc').value = todo.description;
        M.updateTextFields(); // Update Materialize labels
      }); 
    
    submitButton.textContent = 'Edit Todo';
    h1.textContent = 'Edit Todo';
  } else {
    submitButton.textContent = 'Create Todo';
    h1.textContent = 'Create Todo';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-desc').value;
    const method = todoId ? 'PUT' : 'POST';
    const url = todoId ? `${API_URL}/${todoId}` : API_URL;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
      .then(() => window.location.href = '/')
      .catch(error => console.error('Error creating/updating todo:', error));
  });
}

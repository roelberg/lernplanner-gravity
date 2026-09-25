const STORAGE_KEY = 'lernplaner_tasks';

/**
 * Lädt die Aufgaben aus dem localStorage.
 * @returns {Array} Liste der Aufgaben
 */
function getTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (!storedTasks) {
    return [];
  }
  try {
    return JSON.parse(storedTasks);
  } catch (error) {
    console.error('Fehler beim Parsen der Aufgaben aus dem localStorage:', error);
    return [];
  }
}

/**
 * Speichert die Aufgaben im localStorage.
 * @param {Array} tasks Liste der Aufgaben
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Rendert die Aufgabenliste im DOM.
 */
function renderTasks() {
  const taskListElement = document.getElementById('task-list');
  const emptyStateElement = document.getElementById('empty-state');
  const tasks = getTasks();

  taskListElement.innerHTML = '';

  if (tasks.length === 0) {
    emptyStateElement.style.display = 'block';
    return;
  }

  emptyStateElement.style.display = 'none';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.status === 'erledigt' ? 'is-erledigt' : ''}`;

    const headerDiv = document.createElement('div');
    headerDiv.className = 'task-header';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;

    headerDiv.appendChild(titleSpan);

    const metaDiv = document.createElement('div');
    metaDiv.className = 'task-meta';

    const subjectBadge = document.createElement('span');
    subjectBadge.className = 'meta-badge badge-subject';
    subjectBadge.textContent = task.subject;
    metaDiv.appendChild(subjectBadge);

    if (task.dueDate) {
      const dueDateBadge = document.createElement('span');
      dueDateBadge.className = 'meta-badge badge-due-date';
      dueDateBadge.textContent = `Fällig: ${task.dueDate}`;
      metaDiv.appendChild(dueDateBadge);
    }

    const priorityBadge = document.createElement('span');
    priorityBadge.className = `meta-badge badge-priority-${task.priority}`;
    priorityBadge.textContent = `Priorität: ${task.priority}`;
    metaDiv.appendChild(priorityBadge);

    const statusBadge = document.createElement('span');
    statusBadge.className = `meta-badge badge-status-${task.status}`;
    statusBadge.textContent = `Status: ${task.status}`;
    metaDiv.appendChild(statusBadge);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'task-actions';

    const toggleStatusBtn = document.createElement('button');
    toggleStatusBtn.type = 'button';
    toggleStatusBtn.className = 'btn-toggle-status';
    toggleStatusBtn.textContent = task.status === 'offen' ? 'Als erledigt markieren' : 'Als offen markieren';
    toggleStatusBtn.addEventListener('click', () => {
      toggleTaskStatus(task.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Löschen';
    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    actionsDiv.appendChild(toggleStatusBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(headerDiv);
    li.appendChild(metaDiv);
    li.appendChild(actionsDiv);

    taskListElement.appendChild(li);
  });
}

/**
 * Zeigt die Fehlermeldung für den Titel an.
 * @param {string} message 
 */
function showTitleError(message) {
  const titleInput = document.getElementById('task-title');
  const titleError = document.getElementById('task-title-error');
  if (titleError) {
    titleError.textContent = message;
    titleError.classList.add('visible');
  }
  if (titleInput) {
    titleInput.classList.add('input-error');
    titleInput.setAttribute('aria-invalid', 'true');
    titleInput.setCustomValidity(message);
  }
}

/**
 * Entfernt die Fehlermeldung für den Titel.
 */
function clearTitleError() {
  const titleInput = document.getElementById('task-title');
  const titleError = document.getElementById('task-title-error');
  if (titleError) {
    titleError.textContent = '';
    titleError.classList.remove('visible');
  }
  if (titleInput) {
    titleInput.classList.remove('input-error');
    titleInput.removeAttribute('aria-invalid');
    titleInput.setCustomValidity('');
  }
}

/**
 * Fügt eine neue Aufgabe hinzu.
 * @param {Event} event 
 */
function handleAddTask(event) {
  event.preventDefault();

  const titleInput = document.getElementById('task-title');
  const subjectInput = document.getElementById('task-subject');
  const dueDateInput = document.getElementById('task-due-date');
  const prioritySelect = document.getElementById('task-priority');
  const statusSelect = document.getElementById('task-status');

  const trimmedTitle = titleInput.value.trim();
  if (!trimmedTitle) {
    showTitleError('Der Titel darf nicht leer sein oder nur aus Leerzeichen bestehen.');
    titleInput.focus();
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    title: trimmedTitle,
    subject: subjectInput.value.trim(),
    dueDate: dueDateInput.value,
    priority: prioritySelect.value,
    status: statusSelect.value
  };

  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  event.target.reset();
  clearTitleError();
  prioritySelect.value = 'normal';
  statusSelect.value = 'offen';

  renderTasks();
}

/**
 * Ändert den Status einer Aufgabe zwischen "offen" und "erledigt".
 * @param {string} taskId 
 */
function toggleTaskStatus(taskId) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = task.status === 'offen' ? 'erledigt' : 'offen';
    saveTasks(tasks);
    renderTasks();
  }
}

/**
 * Löscht eine Aufgabe anhand der ID.
 * @param {string} taskId 
 */
function deleteTask(taskId) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((t) => t.id !== taskId);
  saveTasks(updatedTasks);
  renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const titleInput = document.getElementById('task-title');

  form.addEventListener('submit', handleAddTask);
  form.addEventListener('reset', clearTitleError);

  if (titleInput) {
    titleInput.addEventListener('input', () => {
      if (titleInput.value.trim().length > 0) {
        clearTitleError();
      }
    });

    titleInput.addEventListener('invalid', (event) => {
      event.preventDefault();
      showTitleError('Der Titel darf nicht leer sein oder nur aus Leerzeichen bestehen.');
    });
  }

  renderTasks();
});

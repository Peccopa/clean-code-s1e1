// "use strict"
// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.
const doc = this.document;
console.log(document, window);
const taskInput = doc.querySelector('.add-section__input');// Add a new task.
const addButton = doc.getElementsByTagName('button')[0];// first button
const incompleteTaskHolder = doc.querySelector('.todo-section__content');// ul of .todo-section__content
const completedTasksHolder = doc.querySelector('.complete-section__content');// completed-tasks

// New task list item
function createNewTaskElement(taskString) {
  const listItem= doc.createElement('li');
  listItem.classList.add('list');
  // input (checkbox)
  const checkBox = doc.createElement('input');// checkbx
  // label
  const label = doc.createElement('label');// label
  // input (text)
  const editInput = doc.createElement('input');// text
  // button.edit
  const editButton = doc.createElement('button');// edit button

  // button.delete
  const deleteButton = doc.createElement('button');// delete button
  const deleteButtonImg = doc.createElement('img');// delete button image
  deleteButtonImg.className = 'delete-btn__img';

  label.innerText = taskString;
  label.className = 'task-label';

  // Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.className = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task-input';

  editButton.innerText = 'Edit'; // innerText encodes special characters, HTML does not.
  editButton.className = 'edit-btn task-button';

  deleteButton.className = 'delete-btn task-button';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  // and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

// Edit an existing task.

function editTask() {
  // console.log('Edit Task...');
  // console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-input');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit-btn');
  const containsClass = listItem.classList.contains('todo-section__edit');
  // If class of the parent is .todo-section__edit
  if (containsClass) {
    // switch to .todo-section__edit
    // label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  // toggle .todo-section__edit on the parent.
  listItem.classList.toggle('todo-section__edit');
}

// Delete task.
function deleteTask() {
  // console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  // console.log('bind list item events');
  // select ListItems children
  const checkBox = taskListItem.querySelector('.checkbox');
  const editButton = taskListItem.querySelector('button.edit-btn');
  const deleteButton = taskListItem.querySelector('button.delete-btn');

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

function taskIncomplete() {
  // console.log('Incomplete Task...');
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the .todo-section__content.
  const listItem = this.parentNode;
  listItem.classList.toggle('complete-section__list');
  incompleteTaskHolder.appendChild(listItem);
  // eslint-disable-next-line no-use-before-define
  bindTaskEvents(listItem, taskCompleted);
}

// Mark task completed
function taskCompleted() {
  // console.log('Complete Task...');

  // Append the task list item to the .complete-section__content
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  listItem.classList.toggle('complete-section__list');
  bindTaskEvents(listItem, taskIncomplete);
}

function ajaxRequest() {
  // console.log('AJAX Request');
}

// The glue to hold it all together.
function addTask() {
  // console.log('Add Task...');
  // Create a new list item with the text from the .add-section__input:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}
// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  // bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  // bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks.

// Change edit to save when you are in edit mode.

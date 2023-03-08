// selectors
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoForm = document.getElementById("todo-form");
const todoUlList = document.getElementById("todo-ul-list");
const filterTodos = document.getElementById("filter-todos");
//  functions
function delete_check(event) {
  event.preventDefault();
  const clickedItem = event.target;
  if (clickedItem.classList.contains("delete-button")) {
    this.classList.add("fall");
    removeDeletedTodoFromLocalStorage(this)
    this.addEventListener("transitionend", (event) => {
      event.preventDefault();
      this.remove();
    });
  }
  if (clickedItem.classList.contains("check-button")) {
    this.classList.add("completed");
  }
}
function createTodo(userWrittenTodo) {
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("class", "todo-div");
  todoDiv.addEventListener("click", delete_check);
  const todoLi = document.createElement("li");
  todoLi.setAttribute("class", "todo-li");
  todoLi.textContent = userWrittenTodo;
  todoDiv.appendChild(todoLi);


  const buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");

  const checkButton = document.createElement("button");
  checkButton.innerHTML = `<i class="fas fa-check"></i>`;
  checkButton.setAttribute("class", "check-button");
  buttons.appendChild(checkButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.setAttribute("class", "delete-button");
  buttons.appendChild(deleteButton);

  todoDiv.appendChild(buttons);
  todoUlList.append(todoDiv);
}
function addTodo(event) {
  event.preventDefault();
  const userNewTodo = todoInput.value;
  // SAVE TO Local storage
  saveTodosInLocalStorage(userNewTodo);
  createTodo(userNewTodo);
  todoInput.value = ``;
}

function filterTodo(event) {
  event.preventDefault();
  const allTodosArray = todoUlList.childNodes;
  allTodosArray.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function getLocalStorageArray() {
  let TodoArrayInLocalStorage;
  if (localStorage.getItem("TodoArrayInLocalStorage") === null) {
    TodoArrayInLocalStorage = [];
  } else {
    TodoArrayInLocalStorage = JSON.parse(
      localStorage.getItem("TodoArrayInLocalStorage")
    );
  }
  return TodoArrayInLocalStorage;
}

function saveTodosInLocalStorage(todo) {
  let TodoArrayInLocalStorage = getLocalStorageArray();
  TodoArrayInLocalStorage.push(todo);
  localStorage.setItem(
    "TodoArrayInLocalStorage",
    JSON.stringify(TodoArrayInLocalStorage)
  );
}

function getTodosFromLocalStorage() {
  let TodoArrayInLocalStorage = getLocalStorageArray();
  TodoArrayInLocalStorage.forEach((todo) => {
    createTodo(todo);
  });
}



function removeDeletedTodoFromLocalStorage(deletedTodoDiv){
  let TodoArrayInLocalStorage = getLocalStorageArray();
  const deletedTodoText = deletedTodoDiv.children[0].textContent;
   const deletedItemIndex =TodoArrayInLocalStorage.indexOf(deletedTodoText)
   TodoArrayInLocalStorage.splice(deletedItemIndex,1);
     localStorage.setItem(
       "TodoArrayInLocalStorage",
       JSON.stringify(TodoArrayInLocalStorage)
     );
}
//  addeventlistener
todoForm.addEventListener("submit", addTodo);
filterTodos.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded",getTodosFromLocalStorage)
// localStorage.clear()
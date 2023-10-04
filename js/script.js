const form = document.getElementsByTagName("form")[0];
const item = document.getElementById("item");
const addTask = document.getElementById("add-task");
const todoTask = document.getElementById("todo-task");
const completeTask = document.getElementById("complete-task");
const todoTaskLists = document.getElementById("todo-task-lists");
const completeTaskLists = document.getElementById("complete-task-lists");
const updateTask = document.getElementById("update-task");
const addToast = document.getElementById("add-toast");
const updateToast = document.getElementById("update-toast");
const deleteToast = document.getElementById("delete-toast");
const input = document.querySelector("#item");
const deleteTask = document.querySelector("#delete-task");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo(item.value);
  item.value = "";
  showaddmsg();
});

const saveTodo = () => {
  const alltodos = document.querySelectorAll("li p");
  const data = [];
  alltodos.forEach((todos) => {
    data.push(todos.innerHTML);
  });
  localStorage.setItem("todos", JSON.stringify(data));
  if (data.length == 0) {
    localStorage.removeItem("todos");
  }
};

const addTodo = (value) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("draggable", "true");
  listItem.addEventListener("drag", (e) => {
    list = e.target;
  });
  completeTask.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  todoTask.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  completeTask.addEventListener("drop", (e) => {
    completeTaskLists.append(list);
    list.classList.add("done");
  });
  todoTask.addEventListener("drop", (e) => {
    todoTaskLists.append(list);
    list.classList.remove("done");
  });
  listItem.innerHTML = `
        <p>${value}</p>
        <div class="icon">
            <i class="fas fa-solid fa-pen"></i>
            <i class="fas fa-times"></i>
        </div>      
    `;
  todoTaskLists.append(listItem);
  deleteItem(listItem);
  updateItem(listItem);
};

function deleteItem(listItem) {
  listItem.querySelector(".fa-times").addEventListener("click", function () {
    deleteTask.style.display = "block";
    document.body.style.overflow = "hidden";
    function yes() {
      deleteTask.style.display = "none";
      document.body.style.overflow = "auto";
      listItem.remove();
      saveTodo();
      showdeletemsg();
      deleteTask
        .querySelectorAll("button")[0]
        .removeEventListener("click", yes);
      deleteTask.querySelectorAll("button")[1].removeEventListener("click", no);
    }
    function no() {
      deleteTask.style.display = "none";
      document.body.style.overflow = "auto";
      deleteTask
        .querySelectorAll("button")[0]
        .removeEventListener("click", yes);
      deleteTask.querySelectorAll("button")[1].removeEventListener("click", no);
    }
    deleteTask.querySelectorAll("button")[0].addEventListener("click", yes);
    deleteTask.querySelectorAll("button")[1].addEventListener("click", no);
    deleteTask.querySelector("i").addEventListener("click", function () {
      deleteTask.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
}

function updateItem(listItem) {
  listItem.querySelector(".fa-pen").addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    updateTask.style.display = "block";
    updateTask.querySelector("input").value =
      listItem.querySelector("p").innerHTML;
    function yes() {
      listItem.querySelector("p").innerHTML =
        updateTask.querySelector("input").value;
      saveTodo();
      showupdatemsg();
      updateTask.style.display = "none";
      document.body.style.overflow = "auto";
      updateTask
        .querySelectorAll("button")[0]
        .removeEventListener("click", yes);
      updateTask.querySelectorAll("button")[1].removeEventListener("click", no);
    }
    function no() {
      updateTask.style.display = "none";
      document.body.style.overflow = "auto";
      updateTask
        .querySelectorAll("button")[0]
        .removeEventListener("click", yes);
      updateTask.querySelectorAll("button")[1].removeEventListener("click", no);
    }
    updateTask.querySelectorAll("button")[0].addEventListener("click", yes);
    updateTask.querySelectorAll("button")[1].addEventListener("click", no);
    updateTask.querySelector("i").addEventListener("click", function () {
      updateTask.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
}

const showaddmsg = () => {
  addToast.classList.add("show");
  addToast.querySelector(".progress").classList.add("active");
  setTimeout(() => {
    addToast.classList.remove("show");
  }, 2000);
  setTimeout(() => {
    addToast.querySelector(".progress").classList.remove("active");
  }, 2500);
};

const showupdatemsg = () => {
  updateToast.classList.add("show");
  updateToast.querySelector(".progress").classList.add("active");
  setTimeout(() => {
    updateToast.classList.remove("show");
  }, 2000);
  setTimeout(() => {
    updateToast.querySelector(".progress").classList.remove("active");
  }, 2500);
};

const showdeletemsg = () => {
  deleteToast.classList.add("show");
  deleteToast.querySelector(".progress").classList.add("active");
  setTimeout(() => {
    deleteToast.classList.remove("show");
  }, 2000);
  setTimeout(() => {
    deleteToast.querySelector(".progress").classList.remove("active");
  }, 2500);
};

(function () {
  const lsalltodos = JSON.parse(localStorage.getItem("todos"));
  if (lsalltodos !== null) {
    lsalltodos.forEach((todos) => {
      addTodo(todos);
    });
  }
})();

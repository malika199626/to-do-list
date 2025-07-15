// const btn = document.querySelector(".todo__add");
// const input = document.querySelector(".todo__text");
// const container = document.querySelector(".todo__items");

// let taskArr = localStorage.getItem("taskArr")
//   ? JSON.parse(localStorage.getItem("taskArr"))
//   : [];
// let i = localStorage.getItem("counter") ? +localStorage.getItem("counter") : 0;

// const addTaskToTaskArr = (value) => {
//   if (!value.trim()) {
//     alert("Пустая строка!");
//     return;
//   }
//   const date = new Date();
//   taskArr.push({
//     value: value,
//     date: date.toLocaleString(),
//     isCompleted: false,
//     id: i,
//   });
//   i++;
//   input.value = "";
//   localStorage.setItem("taskArr", JSON.stringify(taskArr));
//   localStorage.setItem("counter", i);
//   renderTasks(taskArr);
// };

// btn.addEventListener("click", (event) => {
//   event.preventDefault();
//   addTaskToTaskArr(input.value);
// });

// const renderTasks = (taskArr) => {
//   container.innerHTML = "";
//   for (let task of taskArr) {
//     const todoItem = document.createElement("li");
//     todoItem.classList.add("todo__item");
//     todoItem.dataset.id = task.id;

//     const todoTask = document.createElement("span");
//     todoTask.classList.add("todo__task");

//     if(task.isCompleted){
//       todoItem.classList.add('completed')
//     }


//     todoItem.append(todoTask);

//     const todoValue = document.createElement("span");
//     todoValue.innerText = task.value;

//     todoTask.append(todoValue);
//     todoTask.innerHTML += `<span class="todo__date">${task.date}</span>`;

//     const btnComplete = document.createElement("span");
//     btnComplete.classList.add("todo__action_complete", "todo__action");

//     const btnDelete = document.createElement("span");
//     btnDelete.classList.add("todo__action_delete", "todo__action");

//     todoItem.append(btnComplete);
//     todoItem.append(btnDelete);

//     container.append(todoItem);
//   }
// };

// container.addEventListener("click", (event) => {
//   if (event.target.classList.contains("todo__action_delete")) {
//     const id = +event.target.closest(".todo__item").dataset.id;
//     let newArr = [];
//     for (let task of taskArr) {
//       if (task.id !== id) {
//         newArr.push(task);
//       }
//     }
//     taskArr = newArr;
//     localStorage.setItem("taskArr", JSON.stringify(taskArr));
//     renderTasks(taskArr);
//   } else if(event.target.classList.contains("todo__action_complete")){
//     let element = event.target
//     const id = +event.target.closest(".todo__item").dataset.id;
//     const newTasks = []

//     for(let task of taskArr){
//       if(task.id === id){
//         element.parentElement.classList.toggle("completed")
//         newTasks.push({...task, isCompleted: !task.isCompleted})
//       } 
//       else{
//         newTasks.push(task)
//       }
//     }
//     taskArr = newTasks
//     localStorage.setItem("taskArr", JSON.stringify(taskArr))
// }
// });

// renderTasks(taskArr);


const btn = document.querySelector(".todo__add");
const input = document.querySelector(".todo__text");
const container = document.querySelector(".todo__items");
const select = document.querySelector(".todo__options");

let taskArr = localStorage.getItem("taskArr")
  ? JSON.parse(localStorage.getItem("taskArr"))
  : [];
let i = localStorage.getItem("counter") ? +localStorage.getItem("counter") : 0;

const addTaskToTaskArr = (value) => {
  if (!value.trim()) {
    alert("Пустая строка!");
    return;
  }
  const date = new Date();
  taskArr.push({
    value: value,
    date: date.toLocaleString(),
    isCompleted: false,
    id: i,
  });
  i++;
  input.value = "";
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  localStorage.setItem("counter", i);
  renderTasks(taskArr);
};

const renderTasks = (taskArr) => {
  container.innerHTML = "";
  for (let { id, isCompleted, value, date } of taskArr) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item", isCompleted && "completed");
    todoItem.dataset.id = id;

    const todoTask = document.createElement("span");
    todoTask.classList.add("todo__task");

    todoItem.append(todoTask);

    const todoValue = document.createElement("span");
    todoValue.innerText = value;

    todoTask.append(todoValue);
    todoTask.innerHTML += <span class="todo__date"> ${date} </span> ;

    const btnComplete = document.createElement("span");
    btnComplete.classList.add("todo_action_complete", "todo_action");

    const btnDelete = document.createElement("span");
    btnDelete.classList.add("todo_action_delete", "todo_action");

    todoItem.append(btnComplete);
    todoItem.append(btnDelete);

    container.append(todoItem);
  }
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  addTaskToTaskArr(input.value);
});

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__action_delete")) {
    const id = +event.target.closest(".todo__item").dataset.id;

    taskArr = taskArr.filter((task) => task.id !== id);

    localStorage.setItem("taskArr", JSON.stringify(taskArr));

    renderTasks(taskArr);
  } else if (event.target.classList.contains("todo__action_complete")) {
    const id = +event.target.closest(".todo__item").dataset.id;
    for (let task of taskArr) {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
        event.target.closest(".todo__item").classList.toggle("completed");
      }
    }
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
    if (select.value === "all") {
      renderTasks(taskArr);
    } else {
      filterTaskArr();
    }
  }
});

const filterTaskArr = () => {
  if (select.value === "active") {
    completedTaskArr = taskArr.filter(({ isCompleted }) => !isCompleted);
    renderTasks(completedTaskArr);
  }
};

select.addEventListener("click", filterTaskArr);

renderTasks(taskArr);
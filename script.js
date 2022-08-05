var inputBox = document.querySelector(".inputField input");
var addButton = document.querySelector(".inputField button");
var todoList = document.querySelector(".todolist");
var deleteButton = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; // user input
    if (userData.trim() != 0) {  // usr values are not only spaces
        addButton.classList.add("active"); // active the add button
    } else {
        addButton.classList.remove("active"); //disconnect add button
    }
}

// function call to display the list all the time
showTask();

// when user clicks on the add button
addButton.onclick = () => {
    // getiing a local storage
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        // transforming json string into js object
        listArr = JSON.parse(getLocalStorage);
    }
    // adding the user data
    listArr.push(userData);
    // transforming js object into json string
    localStorage.setItem("New ToDo", JSON.stringify(listArr));

    showTask(); // calling the function to add task in the list
}


// function to show the user data int the todo list
function showTask() {
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        // transforming json string into js object
        listArr = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick = "deleteTask()";><i class="fa fa-check" aria-hidden="true"></i></span></li>`;
    });
    // adding new list inside to do part
    todoList.innerHTML = newLiTag;

    // once task is added input box is back to blank
    inputBox.value = "";

    // show the pending task number
    var pendingTask = document.querySelector(".pendingNumber");
    pendingTask.textContent = listArr.length; 

    if (listArr.length > 0) {  // usr values are not only spaces
        deleteButton.classList.add("active"); // active the add button
    } else {
        deleteButton.classList.remove("active"); //disconnect add button
    }
}

function workDone() {
    listArr.classList.add("colorChange");
}

// function to delete task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask();
}


// clear all the list from the task
deleteButton.onclick = () => {
    listArr = [];
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask();
}


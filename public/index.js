const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const list = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Vous n'avez écrit aucune tâche");
    } else{
        let li = document.createElement("li");
        let priority = prioritySelect.value;
        li.innerHTML = `${inputBox.value}`;
        li.setAttribute("data-priority", priority);
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        sortTasks();
    }
    inputBox.value = '';
    saveData();
}

list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }   
}, false);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}

function showListTask(){
    list.innerHTML = localStorage.getItem("data");
    sortTasks();
}

function sortTasks() {
    let items = Array.from(list.children);
    items.sort((a, b) => a.getAttribute("data-priority") - b.getAttribute("data-priority"));
    items.forEach(item => list.appendChild(item));
}

showListTask();

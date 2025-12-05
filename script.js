const todo = document.querySelector("#todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done"); 
const tasks = document.querySelectorAll('.task');
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg")
const toggleModalBtn = document.querySelector("#toggle-modal")
const addBtn = document.querySelector("#add-new-task");


let dragElement = null;

tasks.forEach( task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})

function addDragOverEvent(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();  
        column.classList.remove("hover-over");

        column.appendChild(dragElement);
        column.classList.remove("hover-open")
    })
}

addDragOverEvent(todo);
addDragOverEvent(progress);
addDragOverEvent(done);

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("modal-active")
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("modal-active")
})

addBtn.addEventListener("click", () => {
   const taskTitle = document.querySelector("#task-title").value
   const taskTextarea = document.querySelector("#task-area").value
   
   const div = document.createElement("div")
   div.classList.add("task")
   div.setAttribute("draggable", "true")
   
   div.innerHTML = `
               <h2 >${taskTitle}</h2>
               <p>${taskTextarea}</p>
               <button>Delete</button>  
            `
    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    todo.appendChild(div)
    modal.classList.remove("modal-active")
})
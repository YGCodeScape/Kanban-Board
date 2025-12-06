let taskData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done"); 
const tasks = document.querySelectorAll('.task');
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".bg")
const toggleModalBtn = document.querySelector("#toggle-modal")
const addBtn = document.querySelector("#add-new-task");

const columns = [todo, progress, done]

let dragElement = null;

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data)

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[ col ].forEach(task => {
            addTask(task.title, task.desc, column)
        })
        updateTaskCount();
    }
}

function addTask(title, desc, column) {
    const div = document.createElement("div")
    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
             <h2 >${title}</h2>
             <p>${desc}</p>
             <button>Delete</button>
    `
    column.appendChild(div)
    div.addEventListener("drag", (e) => {
            dragElement = div;
    })
    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove()
        updateTaskCount()
    })
    return div
};

function updateTaskCount() {
        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task")
            const count = col.querySelector(".right")

           taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title : t.querySelector("h2").innerText,
                desc : t.querySelector("p").innerText
            }
           })
           localStorage.setItem("tasks", JSON.stringify(taskData));
           count.innerText = tasks.length
        })
};


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

        updateTaskCount();
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
   
   addTask(taskTitle, taskTextarea, todo);
   updateTaskCount();

    modal.classList.remove("modal-active")
    document.querySelector("#task-title").value = ""
    document.querySelector("#task-area").value = ""
})
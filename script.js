const todo = document.querySelector("#todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done"); 

const tasks = document.querySelectorAll('.task');

tasks.forEach( task => {
    task.addEventListener("drag", (e) => {
        console.log("draging")
    })
})

progress.addEventListener("dragenter", (e) => {
       progress.classList.add("hover-over")
})

progress.addEventListener("dragleave", (e) => {
       progress.classList.remove("hover-over")
})
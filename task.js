// const taskForm = document.querySelector(".taskForm");

const taskInput = document.querySelector(".task-input");

const taskUL = document.querySelector(".list--taskList");
const finishUL = document.querySelector(".list--finishList");


const LS_TASK = "TASK";

const LS_FINISH = "FINISH";

let taskArray = [];

// let finishedArray = [];

// let fsdf = [];



function handleDelete(event){
    const selectedBtn = event.target;
    const deletedTask = selectedBtn.parentNode;
  if(deletedTask.parentNode == taskUL){
    taskUL.removeChild(deletedTask);
    const cleanArray = taskArray.filter(task => {
        return task.id !== parseInt(deletedTask.id);
    })
    taskArray = cleanArray;
  }
  if(deletedTask.parentNode == finishUL){
    finishUL.removeChild(deletedTask);
    const cleanArray = finishedArray.filter(task => {
        return task.id !== parseInt(deletedTask.id);
    })
    finishedArray = cleanArray;
  }
    saveTask();
}

function saveTask(){
    localStorage.setItem(LS_TASK,JSON.stringify(taskArray));
    // localStorage.setItem(LS_FINISH, JSON.stringify(finishedArray));
}

// function paintFinishedTask(text){
//     const li = document.createElement("li");
//     const span = document.createElement("span");
//     span.innerText = text;
//     const taskId = finishedArray.length;
//     const delBtn = document.createElement("button");
//     delBtn.innerText = "❌";
//     delBtn.addEventListener("click",handleDelete);
//     li.appendChild(span);
//     li.appendChild(delBtn);
//     li.id = taskId;
//     li.classList.add("dragElement");
//     li.setAttribute("draggable", true);
//     finishUL.appendChild(li);
//     const finishObj = {
//         text: text,
//         id: taskId
//     }
//     finishedArray.push(finishObj);
//     saveTask();
// }


// function handleFinishedTask(event){
//     const finishedTask = event.target;
//     console.log(finishedTask.parentNode);
//  if(finishedTask.parentNode === finishUL){
//     const cleanArray = taskArray.filter(task => {
//         return task.id !== parseInt(finishedTask.id);
//     })
//     taskArray = cleanArray;
   
//     // finishUL.appendChild(finishedTask);
//     const finishObj = {
//         text: finishedTask.childNodes[0].innerText,
//         id: finishedTask.id
//     }
//     // paintFinishedTask(finishedTask.childNodes[0].innerText);
//     finishedArray.push(finishObj);
    
//     saveTask();
//  }else{
//      const cleanArray = finishedArray.filter(task => {
//         return task.id !== parseInt(finishedTask.id);
//      })
//      finishedArray = cleanArray;
     

//      const taskObj = {
//         text: finishedTask.childNodes[0].innerText,
//         id: finishedTask.id
//      }

//      taskArray.push(taskObj);
//      saveTask();
//  }
// }

function paintTask(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const taskId = taskArray.length;
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",handleDelete);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = taskId;
    li.classList.add("dragElement");
    li.setAttribute("draggable", true);
    taskUL.appendChild(li);
    const taskObj = {
        text: text,
        id: taskId
    }
    taskArray.push(taskObj)
    // fsdf.push(li);
    // console.log(fsdf)
    saveTask();
}

function handleSubmit(event){
    event.preventDefault();
   
    const taskText = taskInput.value;
    paintTask(taskText);
    taskInput.value = "";
}

function detectTask(){
    const currentTask = localStorage.getItem(LS_TASK);
    const currentFinishedTask = localStorage.getItem(LS_FINISH);
    if(currentTask !== null){
        const parsedCurrentTask = JSON.parse(currentTask);
        parsedCurrentTask.forEach(task => {
            paintTask(task.text);
        });
    }
    if(currentFinishedTask !==null){
        const parsedCurrentFinishedTask = JSON.parse(currentFinishedTask);
        parsedCurrentFinishedTask.forEach(task => {
            paintFinishedTask(task.text);
        })
    }
}

function init(){
    taskForm.addEventListener("submit",handleSubmit);
    detectTask();
    
}

init();


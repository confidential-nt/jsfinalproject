// const taskForm = document.querySelector(".taskForm");

const taskInput = document.querySelector(".task-input");
const taskUL = document.querySelector(".list--taskList.dropOrigin");
const finishUL = document.querySelector(".list--finishList.dropZone");
const dragElement = document.getElementsByClassName("dragElement");
// const dropOrigin = document.querySelector(".dropOrigin");
// const dropZone = document.querySelector(".dropZone");


const LS_TASK = "TASK";

const LS_FINISH = "FINISH";

let taskArray = [];

let finishedArray = [];

let finish = false;

function dropOriginDropHandler(event){
    const data = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(data);
    taskUL.appendChild(draggableElement);
    event.dataTransfer.clearData();
    finish = false;
}

function dropZoneDropHandler(event){
  const data = event.dataTransfer.getData("text");
  console.log(data);
  const draggableElement = document.getElementById(data);
  console.log(draggableElement)
  console.log(dragElement);
  finishUL.appendChild(draggableElement);
  event.dataTransfer.clearData();
  finish = true;
}

function dragOverHandler(event){
    
    event.preventDefault();
}

function dragStartHandler(event){
    console.log(event);
    event.dataTransfer.setData("text/plain", event.target.id);
    
}

function handleDelete(event){
    const selectedBtn = event.target;
    const deletedTask = selectedBtn.parentNode;
    console.log(deletedTask.parentNode);
  if(deletedTask.parentNode == taskUL){
    taskUL.removeChild(deletedTask);
    const cleanArray = taskArray.filter(task => {
        return task.id !== parseInt(deletedTask.id);
    })
    taskArray = cleanArray;
  }
  else{
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
    localStorage.setItem(LS_FINISH, JSON.stringify(finishedArray));
}

function paintFinishedTask(text){
    const li = document.createElement("li");
    li.classList.add("dragElement");
    li.setAttribute("draggable", true);
    const span = document.createElement("span");
    span.innerText = text;
    const taskId = finishedArray.length;
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",handleDelete);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = taskId;
    
    finishUL.appendChild(li);
    const finishObj = {
        text: text,
        id: taskId
    }
    finishedArray.push(finishObj);
    saveTask();
}


function handleFinishedTask(e){
    const draggedElement = e.target;
    console.log(draggedElement)
   if(finish === false){
    const cleanArray = finishedArray.filter(task => {
        return task.id !== parseInt(draggedElement.id);
    })
    finishedArray= cleanArray;
    const taskObj = {
        text: draggedElement.childNodes[0].innerText,
        id: taskArray.length
    }
    taskArray.push(taskObj)
   }else{
    const cleanArray = taskArray.filter(task => {
        return task.id !== parseInt(draggedElement.id);
    })
    taskArray = cleanArray;
    const finishObj = {
        text: draggedElement.childNodes[0].innerText,
        id: finishedArray.length
    }
    finishedArray.push(finishObj);
   }
   saveTask();
}

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

function dragAndDrop(){
  Array.from(dragElement).forEach((element) => {
  element.addEventListener("dragstart", dragStartHandler)
  element.addEventListener("dragend",handleFinishedTask)  
});
  finishUL.addEventListener("dragover", dragOverHandler);
  finishUL.addEventListener("drop", dropZoneDropHandler);
  taskUL.addEventListener("dragover", dragOverHandler);
  taskUL.addEventListener("drop", dropOriginDropHandler);
}

function init(){
    
    taskForm.addEventListener("submit",handleSubmit);
    detectTask();
    dragAndDrop();
    
}

init();


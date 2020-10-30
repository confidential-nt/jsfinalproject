
const taskInput = document.querySelector(".task-input");
const taskUL = document.querySelector(".list--taskList.dropOrigin");
const finishUL = document.querySelector(".list--finishList.dropZone");
const dragElement = document.getElementsByClassName("dragElement");


const LS_TASK = "TASK";

const LS_FINISH = "FINISH";

let taskArray = [];

// let finishedArray = [];



function dropOriginDropHandler(event){
    const data = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(data);
    taskUL.appendChild(draggableElement);
    handleFinishedTask(data, draggableElement);
    event.dataTransfer.clearData();  
}

function dropZoneDropHandler(event){
  const data = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(data);
  finishUL.appendChild(draggableElement);
  handleFinishedTask(data, draggableElement);
  event.dataTransfer.clearData();

}

function dragOverHandler(event){
    event.preventDefault();
}

function dragStartHandler(event){
    event.dataTransfer.setData("text/plain", event.target.id); 
}

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
    const taskId = (finishedArray.length + 1)*10;
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
    dragAndDrop();
    saveTask();
}


function handleFinishedTask(data, draggableElement){

   if(draggableElement.parentNode === taskUL){
    const cleanArray = finishedArray.filter(task => {
        return task.id !== parseInt(data);
    })
    finishedArray= cleanArray;
    const taskObj = {
        text: draggableElement.childNodes[0].innerText,
        id: taskArray.length + 1
    }
    taskArray.push(taskObj)
    draggableElement.id = taskArray.length;
   }else if(draggableElement.parentNode === finishUL){
    const cleanArray = taskArray.filter(task => {
        return task.id !== parseInt(data);
    })
   
    taskArray = cleanArray;

    const finishObj = {
        text: draggableElement.childNodes[0].innerText,
        id: (finishedArray.length + 1)*10
    }
    finishedArray.push(finishObj);
    draggableElement.id = finishedArray.length*10;
   }
   
   saveTask();
}

function paintTask(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const taskId = taskArray.length + 1;
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
    dragAndDrop();
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
});
  finishUL.addEventListener("dragover", dragOverHandler);
  finishUL.addEventListener("drop", dropZoneDropHandler);
  taskUL.addEventListener("dragover", dragOverHandler);
  taskUL.addEventListener("drop", dropOriginDropHandler);
}

function init(){
    taskForm.addEventListener("submit",handleSubmit);
    detectTask();
}

init();


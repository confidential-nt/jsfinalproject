const nameform = document.querySelector(".nameForm");
const taskForm = document.querySelector(".taskForm");
const nameInput = document.querySelector(".name-input");
const nameView = document.querySelector(".hello");



const LS_NAME = "NAME"

function saveName(nameValue){
    localStorage.setItem(LS_NAME, nameValue);
}

function paintName(text){
    if(text == ""){
        nameView.innerText = `Hello, Anonymous`;
        text = "Anonymous"
    }else{
        nameView.innerText = `Hello, ${text}`;
    } 
    saveName(text);
}

function greetingProcess(event){
    event.preventDefault();
    nameInput.classList.add("hide");
    taskForm.classList.remove("hide");
    
    const name = nameInput.value;
    paintName(name);
    nameInput.value = "";
}

function handleName(){
    const currentName = localStorage.getItem(LS_NAME);
    if(currentName !== null){
        nameInput.classList.add("hide");
        nameView.innerText = `Hello, ${currentName}`;
        taskForm.classList.remove("hide");
    }
}

function init(){
    nameform.addEventListener("submit", greetingProcess);
    handleName();
}

init();
const dropOrigin = document.querySelector(".dropOrigin");
const dropZone = document.querySelector(".dropZone");
const dragElement = document.querySelectorAll(".dragElement");

function dropOriginDropHandler(event){
    const data = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(data);
    dropOrigin.appendChild(draggableElement);
    event.dataTransfer.clearData();
}

function dropZoneDropHandler(event){
  const data = event.dataTransfer.getData("text");
  console.log(data);
  const draggableElement = document.getElementById(data);
  console.log(draggableElement);
  dropZone.appendChild(draggableElement);
  event.dataTransfer.clearData();
}

function dragOverHandler(event){
    event.preventDefault();
}

function dragStartHandler(event){
    event.dataTransfer.setData("text/plain", event.target.id);
}

dropZone.addEventListener("dragover", dragOverHandler);
dropZone.addEventListener("drop", dropZoneDropHandler);
dropOrigin.addEventListener("dragover", dragOverHandler);
dropOrigin.addEventListener("drop", dropOriginDropHandler);

Array.from(dragElement).forEach(element =>
    element.addEventListener("dragend", handleFinishedTask));

Array.from(dragElement).forEach((element) =>
  element.addEventListener("dragstart", dragStartHandler)
);


const bgImg = document.querySelector(".bg-img");

const body = document.querySelector("body");


function getBgImage(number){
    const image = new Image();
    image.src = `./images/${number + 1}.jpg`;
    image.classList.add("bg-img");
    body.appendChild(image);
}

function getRandomNumber(){
    const number = Math.floor(Math.random()*5)
    return number;    
}

function init(){
    const randomNumber = getRandomNumber();
    getBgImage(randomNumber);
}

init();
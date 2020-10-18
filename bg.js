const bgImg = document.querySelector(".bg-img");


function getBgImage(number){
    const src = `./images/${number + 1}.jpg`;
    bgImg.style.backgroundImage = `url(${src})`;
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
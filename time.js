const timeView = document.querySelector(".time-view");

function showingTime(){
    const time = new Date()
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    timeView.innerHTML = `<h2>${hour < 10? `0${hour}` : hour}:${minute < 10? `0${minute}` : minute}:${second<10? `0${second}` : second}</h2>`;
}

setInterval(showingTime, 1000);
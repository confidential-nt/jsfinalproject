const weatherView = document.querySelector(".weather-view")

const API_KEYS = "0be22e586c83d7678df34c9855a53d9b";

const LS_COORDS = "COORDS";


function getWeather(long , lat){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEYS}&units=metric`
      ).then(function(response){
          return response.json();
      }
        ).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weatherView.innerHTML = `<h2>${place}:${temperature}°C</h2>`
        })
}

function saveCoords(coords){
    localStorage.setItem(LS_COORDS,JSON.stringify(coords));
}

function handleGeoSuc(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(longitude , latitude);
}

function handleGeoErr(){
    alert("You refused!");
    weatherView.innerHTML = `<h2>I wonder your location</h2>`   
}



function askForLocation(){
    const currentCoords = localStorage.getItem(LS_COORDS);
    if(currentCoords === null){
        navigator.geolocation.getCurrentPosition(handleGeoSuc, handleGeoErr);
    }else{
        const parsedCoords = JSON.parse(currentCoords);
        getWeather(parsedCoords.longitude, parsedCoords.latitude);
    }
}

askForLocation();
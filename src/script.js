let now = new Date();
let currentDay = document.querySelector("#current-day");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];
let date = now.getDate();
let months = ["Jan", "Fev", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let month = months[now.getMonth()];
let hour=now.getHours();

function addZero (minutes) {
  if (minutes < 10) {
    return "0" + minutes;
  } else {
    return minutes; 
  }
}
let minutes=now.getMinutes();
let doubleminutes = addZero(minutes);

currentDay.innerHTML =`${day}, ${date} ${month} ${hour}:${doubleminutes}`;

function search (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#current-city");
  city.innerHTML=`${searchInput.value.toUpperCase()}`;
  let apiKey="f2307cbce532cfdeb3168c7d625e3421";
  let units ="metric";
  let apiCity=`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiCity).then(showTemp);
  
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showTemp (response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
  let location = document.querySelector("#current-city")
  location.innerHTML = response.data.name.toUpperCase();

}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
  let units = "metric";
  let apiLoc = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiLoc).then(showTemp);
}

function showCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);

}
let button = document.querySelector("#current-location");
button.addEventListener("click", showCoords);

function showTempFah (event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#temperature");
  let tempFahrenheit = Math.round((15*9) / 5 + 32);
  tempCelcius.innerHTML = `${tempFahrenheit}`;
}
let fahrenheit = document.querySelector("#fahrenheit-temp");
fahrenheit.addEventListener("click", showTempFah);

function showTempCel (event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#temperature");
  tempCelcius.innerHTML = "15";
}
let celcius = document.querySelector("#celcius-temp");
celcius.addEventListener("click", showTempCel);
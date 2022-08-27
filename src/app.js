let now = new Date();
let h2 = document.querySelector("h2");
let hour = now.getHours();
let min = now.getMinutes();
let date = now.getDate();
let month = now.getMonth() + 1;
if (min < 10) {
  min = `0${min}`;
}
if (date < 10) {
  date = `0${min}`;
}
if (month < 10) {
  month = `0${month}`;
}

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
h2.innerHTML = `${days[day]}, ${hour}:${min}`;

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#user-city").value;
  let apiKey = "38f4ffb4599af28a6348dacfb33c46b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let currentData = document.querySelector("#data-today");
currentData.innerHTML = `${date}/${month}`;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let newCityValue = response.data.name;
  let currentCity = document.querySelector("h1");
  let currentTemp = document.querySelector(".temptoday");
  currentCity.innerHTML = newCityValue;
  currentTemp.innerHTML = `${temperature}℃`;
}

let inputForm = document.querySelector("#input-form");
inputForm.addEventListener("submit", changeCity);

function findPlace(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "38f4ffb4599af28a6348dacfb33c46b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPlace);
}

let geoLocation = document.querySelector("#current-location-btn");
geoLocation.addEventListener("click", clickButton);

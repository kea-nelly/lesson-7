function refreshWeather(response) {
  let tempValue = document.querySelector("#weather-temp-value");
  let temperature = response.data.temperature.current;

  let enteredCity = document.querySelector("#city");
  enteredCity.innerHTML = response.data.city;
  tempValue.innerHTML = Math.round(temperature);

  let tempDescription = document.querySelector("#temp-description");
  tempDescription.innerHTML = response.data.condition.description;

  let tempHumidity = document.querySelector("#humidity");
  tempHumidity.innerHTML = `${response.data.temperature.humidity}%`;

  let tempWind = document.querySelector("#wind");
  tempWind.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = ` <img src="${response.data.condition.icon_url}" class="weather-app-icon"> `;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "4t3b0c0493f4f5e63b225526afa19e0o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

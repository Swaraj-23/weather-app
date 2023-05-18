const searchForm = document.querySelector('.weather__search');
const searchInput = document.querySelector('.weather__searchform');
const city = document.querySelector('.weather__city');
const datetime = document.querySelector('.weather__datetime');
const temperature = document.querySelector('.weather__temperature');
const icon = document.querySelector('.weather__icon');
const realFeel = document.querySelector('.weather__realfeel');
const humidity = document.querySelector('.weather__humidity');
const wind = document.querySelector('.weather__wind');
const pressure = document.querySelector('.weather__pressure');
const unitCelsius = document.querySelector('.weather_unit_celsius');
const unitFarenheit = document.querySelector('.weather_unit_farenheit');
const weather__forecast = document.querySelector('.weather__forecast');

const apiKey = '64f60853740a1ee3ba20d0fb595c97d5';

// function to convert temperature from Kelvin to Celsius
function convertToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

// function to convert temperature from Kelvin to Fahrenheit
function convertToFarenheit(kelvin) {
  return Math.round((kelvin * 9/5) - 459.67);
}

// function to update the weather information on the page
function updateWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    const timezoneOffset = data.timezone;
    const localTime = new Date().getTime();
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const cityTime = utc + (1000 * timezoneOffset);
    const date = new Date(cityTime);
    datetime.textContent = date.toLocaleString();
    temperature.textContent = `${convertToCelsius(data.main.temp)}°C`;
    realFeel.textContent = `${convertToCelsius(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`;
    wind.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">`;
  }


// function to fetch weather data from API
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}
  
// event listener for search form submission
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = searchInput.value.trim();
  const data = await fetchWeatherData(city);
  updateWeather(data);
});

// event listeners for temperature unit selection
unitCelsius.addEventListener('click', () => {
  unitCelsius.classList.add('active');
  unitFarenheit.classList.remove('active');
  const celsius = convertToCelsius(parseFloat(temperature.textContent));
  temperature.textContent = `${celsius}°C`;
  realFeel.textContent = `${convertToCelsius(parseFloat(realFeel.textContent))}°C`;
});

unitFarenheit.addEventListener('click', () => {
  unitFarenheit.classList.add('active');
  unitCelsius.classList.remove('active');
  const farenheit = convertToFarenheit(parseFloat(temperature.textContent));
  temperature.textContent = `${farenheit}°F`;
  realFeel.textContent = `${convertToFarenheit(parseFloat(realFeel.textContent))}°F`;
});

// initialize with default city
fetchWeatherData('Pune').then(data => {
  updateWeather(data);
});

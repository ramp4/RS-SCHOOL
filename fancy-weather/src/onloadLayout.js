const infoLocation = document.querySelector('.info__location');
const infoDate = document.querySelector('.info__date');
const mainWeatherTemperature = document.querySelector('.main-weather__temperature');
const mainWeatherIcon = document.querySelector('.main-weather__icon');


function getLocationData() {
  const url = 'https://ipinfo.io/json?token=08f12254167956';
  return fetch(url).then((result) => result.json());
}

const { getName } = require('country-list');

function getWeatherData(city, lang) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&cnt=1&units=metric&APPID=df773d568696e244bf0864cd6367d9c5`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.list[0]);
}

getLocationData().then((locationData) => {
  infoLocation.innerHTML = `${locationData.city}, ${getName(locationData.country)}`;

  getWeatherData(locationData.city, 'en').then((weatherData) => {
    console.log(weatherData);
    mainWeatherTemperature.innerHTML = `${weatherData.main.temp}°`;
    mainWeatherIcon.style.backgroundImage = `url('http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png')`;
  });
});


function setCurrentDate() {
  const currentDate = new Date();

  function setMonth(index) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[index];
  }

  function setDay(index) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[index];
  }

  function setZero(number) {
    if (number < 10) return `0${number}`;
    return number;
  }
  const result = `${setDay(currentDate.getDay())} ${setZero(currentDate.getDate())} ${setMonth(currentDate.getMonth())} ${setZero(currentDate.getHours())}:${setZero(currentDate.getMinutes())}`;

  return result;
}

infoDate.innerHTML = setCurrentDate();

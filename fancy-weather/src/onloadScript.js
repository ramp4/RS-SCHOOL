const infoLocation = document.querySelector('.info__location');
const infoDate = document.querySelector('.info__date');
const mainWeatherTemperature = document.querySelector('.main-weather__temperature');
const mainWeatherIcon = document.querySelector('.main-weather__icon');
const detailsItems = document.getElementsByClassName('details__item');
const body = document.querySelector('body');
const forecastItemDayArray = document.getElementsByClassName('forecast-item__day');
const forecastItemTemperatureArray = document.getElementsByClassName('forecast-item__temperature');
const forecastItemIconArray = document.getElementsByClassName('forecast-item__icon');

let currentDate = new Date();
function setDay(index) {
  let i = index;
  if (i > 6) {
    i -= 7;
  }
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[i];
}

function setCurrentDate() {
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


  function setZero(number) {
    if (number < 10) return `0${number}`;
    return number;
  }
  const result = `${setDay(currentDate.getDay())} ${setZero(currentDate.getDate())} ${setMonth(currentDate.getMonth())} ${setZero(currentDate.getHours())}:${setZero(currentDate.getMinutes())}`;

  return result;
}
infoDate.innerHTML = setCurrentDate();


let refreshDate = function () {
  currentDate = new Date();
  console.log('a');
  const seconds = currentDate.getSeconds();
  if (seconds === 0) {
    infoDate.innerHTML = setCurrentDate();
    setInterval(() => {
      infoDate.innerHTML = setCurrentDate();
    }, 60000);
    refreshDate = null;
    return;
  }
  setTimeout(() => {
    refreshDate();
  }, 950);
};

refreshDate();

function getLocationData() {
  const url = 'https://ipinfo.io/json?token=08f12254167956';
  return fetch(url).then((result) => result.json());
}

const { getName } = require('country-list');

function getWeatherData(city, lang) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&cnt=24&units=metric&APPID=df773d568696e244bf0864cd6367d9c5`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.list);
}

function getBG(weather) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather}order_by=popular&client_id=09ade6d49c5651607a93d8183e34f5f6ba29411e9e3ef2388640614d25a3a986`;
  return fetch(url)
    .then((result) => result.json())
    .then((data) => data.urls.regular);
}


getLocationData().then((locationData) => {
  infoLocation.innerHTML = `${locationData.city}, ${getName(locationData.country)}`;
  sessionStorage.setItem('city', locationData.city);
  sessionStorage.setItem('tType', ' Celsius');

  getWeatherData(locationData.city, 'en').then((weatherDataArray) => {
    sessionStorage.setItem('lang', 'En');

    const weatherData = weatherDataArray[0];
    mainWeatherTemperature.innerHTML = `${Math.round(weatherData.main.temp)}`;
    mainWeatherIcon.style.backgroundImage = `url('http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png')`;
    detailsItems[0].innerHTML = weatherData.weather[0].description;
    detailsItems[1].innerHTML = `feels like: ${Math.round(weatherData.main.feels_like)}°`;
    detailsItems[2].innerHTML = `wind: ${Math.round(weatherData.wind.speed)} m/s`;
    detailsItems[3].innerHTML = `Humidity:  ${Math.round(weatherData.main.humidity)}%`;

    // 3 days forecast
    const curHours = `${weatherDataArray[0].dt_txt[11]}${weatherDataArray[0].dt_txt[12]}`;
    let nextDayIndex = (24 - curHours + 12) / 3;

    for (let i = 0; i < 3; i += 1) {
      forecastItemDayArray[i].innerHTML = `${setDay(currentDate.getDay() + i + 1)}`;
      forecastItemTemperatureArray[i].innerHTML = `${Math.round(weatherDataArray[nextDayIndex].main.temp)}`;
      forecastItemIconArray[i].style.backgroundImage = `url('http://openweathermap.org/img/wn/${weatherDataArray[nextDayIndex].weather[0].icon}@2x.png')`;
      nextDayIndex += 8;
    }


    getBG(`${weatherData.weather[0].main} weather`).then((background) => {
      body.style.backgroundImage = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),
        url('${background}')`;
    }).catch(() => {
      body.style.backgroundColor = 'black';
    });
  });
});


console.log(sessionStorage);

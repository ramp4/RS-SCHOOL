const body = document.querySelector('body');
const infoLocation = document.querySelector('.info__location');
const infoDate = document.querySelector('.info__date');
const mainWeatherTemperature = document.querySelector('.main-weather__temperature');
const mainWeatherIcon = document.querySelector('.main-weather__icon');
const detailsItems = document.getElementsByClassName('details__item');
const forecastItemDayArray = document.getElementsByClassName('forecast-item__day');
const forecastItemTemperatureArray = document.getElementsByClassName('forecast-item__temperature');
const forecastItemIconArray = document.getElementsByClassName('forecast-item__icon');

function getBG(weather) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather}order_by=popular&client_id=09ade6d49c5651607a93d8183e34f5f6ba29411e9e3ef2388640614d25a3a986`;
  return fetch(url)
    .then((result) => result.json())
    .then((data) => data.urls.regular);
}

function getWeatherData(city, lang) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&cnt=32&units=metric&APPID=df773d568696e244bf0864cd6367d9c5`;

  return fetch(url)
    .then((response) => response.json());
}


// _________________________refreshBG button_________________________


const refreshBG = document.querySelector('.button-row__refresh-button');

refreshBG.addEventListener('click', () => {
  getBG(`${sessionStorage.weather} weather`).then((background) => {
    body.style.backgroundImage = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),
        url('${background}')`;
  }).catch(() => {
    body.style.backgroundColor = 'black';
  });
});


// _________________________temperature switcher________________________

function convertTemperature(value) {
  let result;
  if (sessionStorage.tType === 'Celsius') {
    sessionStorage.tType = 'Fahrenheit';
    result = Math.round((value * 9) / 5 + 32);
  } else
  if (sessionStorage.tType === 'Fahrenheit') {
    sessionStorage.tType = 'Celsius';
    return Math.round(((value - 32) * 5) / 9);
  }
  return result;
}

const temperatureSwitcherArray = document.getElementsByClassName('temperature-switcher__item');
const detailsWeather = document.getElementsByClassName('details__item')[1];

for (let i = 0; i < 2; i += 1) {
  temperatureSwitcherArray[i].addEventListener('click', () => {
    temperatureSwitcherArray[0].classList.toggle('temperature-switcher__item_current');
    temperatureSwitcherArray[1].classList.toggle('temperature-switcher__item_current');
    let value = mainWeatherTemperature.innerHTML;
    mainWeatherTemperature.innerHTML = `${convertTemperature(value)}`;


    value = detailsWeather.innerHTML.slice(12, detailsWeather.innerHTML.length - 1);
    detailsWeather.innerHTML = `feels like: ${convertTemperature(value)}°`;

    for (let j = 0; j < 3; j += 1) {
      value = forecastItemTemperatureArray[j].innerHTML;
      forecastItemTemperatureArray[j].innerHTML = `${convertTemperature(value)}`;
    }
  });
}


// _________________________search row field _______________________

const searchRowField = document.querySelector('.search-row__field');

searchRowField.addEventListener('focus', () => {
  if (searchRowField.value === 'Search city or ZIP') {
    searchRowField.value = '';
  }
});

searchRowField.addEventListener('blur', () => {
  if (searchRowField.value === '') {
    searchRowField.value = 'Search city or ZIP';
  }
});


// _________________________search button________________________

const zipcodes = require('zipcodes');

const searchRowButton = document.querySelector('.search-row__button');
// date refresher

function setDay(index) {
  let i = index;
  if (i > 6) {
    i -= 7;
  }
  let days;
  if (sessionStorage.lang.toLowerCase() === 'en') {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  if (sessionStorage.lang.toLowerCase() === 'ru') {
    days = ['Воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  }

  if (sessionStorage.lang.toLowerCase() === 'by') {
    days = ['Нядзеля', 'Панядзелак', 'аўторак', 'серада', 'чацвер', 'Пятніца', 'Субота'];
  }

  return days[i];
}

function getCurrentDate() {
  const currentDate = new Date(Date.now((Date.UTC) - sessionStorage.timezone * 1000));
  return currentDate;
}


function dateToTxt(date) {
  let months;
  function setMonth(index) {
    if (sessionStorage.lang.toLowerCase() === 'en') {
      months = [
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
    }

    if (sessionStorage.lang.toLowerCase() === 'ru') {
      months = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ];
    }

    if (sessionStorage.lang.toLowerCase() === 'by') {
      months = [
        'Студзеня',
        'Лютага',
        'Сакавіка',
        'Красавіка',
        'Мая',
        'Чэрвеня',
        'Ліпеня',
        'Жніўня',
        'Верасня',
        'Кастрычніка',
        'Лістапад',
        'Сьнежня',
      ];
    }

    return months[index];
  }

  function setZero(number) {
    if (number < 10) return `0${number}`;
    return number;
  }
  const result = `${setDay(date.getDay())} ${setZero(date.getDate())} ${setMonth(date.getMonth())} ${setZero(date.getHours())}:${setZero(date.getMinutes())}`;

  return result;
}

function currentDateConstructor() {
  infoDate.innerHTML = dateToTxt(getCurrentDate());

  let refreshDate = function refreshDateFunction() {
    let updatedDate = getCurrentDate();
    const seconds = updatedDate.getSeconds();
    if (seconds === 0) {
      infoDate.innerHTML = dateToTxt(updatedDate);
      setInterval(() => {
        updatedDate = getCurrentDate();
        infoDate.innerHTML = dateToTxt(updatedDate);
      }, 60000);
      refreshDate = null;
      return;
    }
    setTimeout(() => {
      refreshDate();
    }, 500);
  };

  refreshDate();
}


// update weather
const { getName } = require('country-list');

function updateData() {
  const tryGetWeatherData = setInterval(() => {
    if (sessionStorage.city !== undefined && sessionStorage.lang !== undefined) {
      getWeatherData(sessionStorage.city, sessionStorage.lang).then((result) => {
        console.log(result);
        sessionStorage.setItem('timezone', result.city.timezone);
        currentDateConstructor();

        infoLocation.innerHTML = `${result.city.name}, ${getName(result.city.country)}`;
        sessionStorage.setItem('latitude', result.city.coord.lat);
        sessionStorage.setItem('longitude', result.city.coord.lon);

        const weatherDataArray = result.list;
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
          forecastItemDayArray[i].innerHTML = `${setDay(getCurrentDate().getDay() + i + 1)}`;
          forecastItemTemperatureArray[i].innerHTML = `${Math.round(weatherDataArray[nextDayIndex].main.temp)}`;
          forecastItemIconArray[i].style.backgroundImage = `url('http://openweathermap.org/img/wn/${weatherDataArray[nextDayIndex].weather[0].icon}@2x.png')`;
          nextDayIndex += 8;
        }

        sessionStorage.setItem('weather', weatherData.weather[0].main);
        getBG(`${weatherData.weather[0].main} weather`).then((background) => {
          body.style.backgroundImage = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),
        url('${background}')`;
        }).catch(() => {
          body.style.backgroundColor = 'black';
        });

        // _________________________map_________________________;


        const geoInfoLatitude = document.querySelector('.geo-info__latitude');
        const geoInfoLongitude = document.querySelector('.geo-info__longitude');


        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(pos) {
          const crd = pos.coords;
          if (sessionStorage.latitude === undefined) {
            sessionStorage.latitude = Math.round(crd.latitude * 100) / 100;
            sessionStorage.longitude = Math.round(crd.longitude * 100) / 100;
          }
        }

        function error(err) {
          // eslint-disable-next-line no-console
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

        const tryGetMap = setInterval(() => {
          if (sessionStorage.latitude !== undefined && sessionStorage.longitude !== undefined) {
            /* eslint-disable no-unused-vars */
            /* eslint-disable no-undef */
            geoInfoLatitude.innerHTML = `Latitude: ${sessionStorage.latitude.slice(0, 2)}°${sessionStorage.latitude.slice(3, 5)}'`;
            geoInfoLongitude.innerHTML = `Longitude: ${sessionStorage.longitude.slice(0, 2)}°${sessionStorage.longitude.slice(3, 5)}'`;

            mapboxgl.accessToken = 'pk.eyJ1IjoicmFtcDQiLCJhIjoiY2s0NGJvMGt1MDlpZzNqcDlkNjhkZGd4bSJ9._tcW4OCvJTpC003r3NwMqQ';
            const map = new mapboxgl.Map({
              container: 'map', // container id
              style: 'mapbox://styles/mapbox/streets-v9',
              center: [sessionStorage.longitude, sessionStorage.latitude],
              zoom: 9, // starting zoom
            });

            const size = 500;

            // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
            // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
            const pulsingDot = {
              width: size,
              height: size,
              data: new Uint8Array(size * size * 4),

              // get rendering context for the map canvas when layer is added to the map
              onAdd() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
              },

              // called once before every frame where the icon will be used
              render() {
                const duration = 1000;
                const t = (performance.now() % duration) / duration;

                const radius = (size / 2) * 0.3;
                const outerRadius = (size / 2) * 0.7 * t + radius;
                const { context } = this;

                // draw outer circle
                context.clearRect(0, 0, this.width, this.height);
                context.beginPath();
                context.arc(
                  this.width / 2,
                  this.height / 2,
                  outerRadius,
                  0,
                  Math.PI * 2,
                );
                context.fillStyle = `rgba(255, 200, 200,${1 - t})`;
                context.fill();

                // draw inner circle
                context.beginPath();
                context.arc(
                  this.width / 2,
                  this.height / 2,
                  radius,
                  0,
                  Math.PI * 2,
                );
                context.fillStyle = 'red';
                context.strokeStyle = 'white';
                context.lineWidth = 2 + 4 * (1 - t);
                context.fill();
                context.stroke();

                // update this image's data with data from the canvas
                this.data = context.getImageData(
                  0,
                  0,
                  this.width,
                  this.height,
                ).data;

                // continuously repaint the map, resulting in the smooth animation of the dot
                map.triggerRepaint();

                // return `true` to let the map know that the image was updated
                return true;
              },
            };

            map.on('load', () => {
              map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 10 });

              map.addLayer({
                id: 'points',
                type: 'symbol',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        geometry: {
                          type: 'Point',
                          coordinates: [sessionStorage.longitude, sessionStorage.latitude],
                        },
                      },
                    ],
                  },
                },
                layout: {
                  'icon-image': 'pulsing-dot',
                },
              });
            });


            /* eslint-enable no-unused-vars */
            /* eslint-enable no-undef */

            clearTimeout(tryGetMap);
          }
        }, 100);
      });
      clearTimeout(tryGetWeatherData);
    }
  }, 100);
}

searchRowButton.addEventListener('click', () => {
  let { value } = searchRowField;
  if (searchRowField.value !== 'Search city or ZIP') {
    if (zipcodes.lookup(value)) {
      value = zipcodes.lookup(value).city;
    }
    sessionStorage.city = value;
    updateData();
  }
});

function pressedEnter(event) {
  let { value } = searchRowField;
  if (event.code === 'Enter' && value !== 'Search city or ZIP' && value !== '') {
    if (zipcodes.lookup(value)) {
      value = zipcodes.lookup(value).city;
    }
    sessionStorage.city = value;
    updateData();
  }
}

searchRowField.addEventListener('focus', () => {
  document.addEventListener('keydown', pressedEnter);
});

searchRowField.addEventListener('blur', () => {
  document.removeEventListener('keydown', pressedEnter);
});

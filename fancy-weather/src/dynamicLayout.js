const body = document.querySelector('body');


function getBG(weather) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather}order_by=popular&client_id=09ade6d49c5651607a93d8183e34f5f6ba29411e9e3ef2388640614d25a3a986`;
  return fetch(url)
    .then((result) => result.json())
    .then((data) => data.urls.regular);
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
const mainWeatherTemperature = document.querySelector('.main-weather__temperature');
const forecastItemTemperatureArray = document.getElementsByClassName('forecast-item__temperature');
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


// _________________________search row________________________


const searchRowField = document.querySelector('.search-row__field');

searchRowField.addEventListener('focus', function clearSearchRowField() {
  if (searchRowField.value === 'Search city or ZIP') {
    searchRowField.value = '';
  }
  searchRowField.removeEventListener('focus', clearSearchRowField());
});

searchRowField.addEventListener('blur', function clearSearchRowField() {
  if (searchRowField.value === '') {
    searchRowField.value = 'Search city or ZIP';
  }
  searchRowField.removeEventListener('blur', clearSearchRowField());
});

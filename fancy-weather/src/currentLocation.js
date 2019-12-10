function getLocationData() {
  const url = 'https://ipinfo.io/json?token=08f12254167956';
  fetch(url)
    .then((result) => result.json());
}
getLocationData();

// const { getName } = require('country-list');
// console.log(getName('BY'));

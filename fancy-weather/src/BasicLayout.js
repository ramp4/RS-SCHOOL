const header = document.createElement('header');
header.className = 'header';
document.body.append(header);

const buttonRow = document.createElement('div');
buttonRow.className = 'button-row';
header.append(buttonRow);

const refreshButton = document.createElement('div');
refreshButton.className = 'button-row__refresh-button';
buttonRow.append(refreshButton);

const langSwitcher = document.createElement('ul');
langSwitcher.className = 'lang-switcher';
buttonRow.append(langSwitcher);
const langArray = new Array(3);

for (let i = 0; i < 3; i += 1) {
  langArray[i] = document.createElement('li');
  langArray[i].className = 'lang-switcher__item';
  langSwitcher.append(langArray[i]);
}

langArray[0].innerHTML = 'EN';
langArray[1].innerHTML = 'RU';
langArray[2].innerHTML = 'BE';
langArray[0].className += ' lang-switcher__item_current';

const tSwitcher = document.createElement('div');
tSwitcher.className = 'temperature-switcher';
buttonRow.append(tSwitcher);

const fTemp = document.createElement('div');
fTemp.className = 'temperature-switcher__item';
tSwitcher.append(fTemp);
fTemp.innerHTML = '°F';

const cTemp = document.createElement('div');
cTemp.className = 'temperature-switcher__item temperature-switcher__item_current';
tSwitcher.append(cTemp);
cTemp.innerHTML = '°С';

const searchRow = document.createElement('div');
searchRow.className = 'search-row';
header.append(searchRow);

const searchField = document.createElement('input');
searchField.className = 'search-row__field';
searchField.type = 'text';
searchField.name = 'search';
searchField.value = 'Search city or ZIP';
searchRow.append(searchField);

const voiceSearch = document.createElement('div');
voiceSearch.className = 'search-row__voice-search';
searchRow.append(voiceSearch);


const searchButton = document.createElement('div');
searchButton.className = 'search-row__button';
searchRow.append(searchButton);
searchButton.innerHTML = 'Search';

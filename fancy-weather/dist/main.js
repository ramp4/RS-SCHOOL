!function(e){var a={};function n(o){if(a[o])return a[o].exports;var c=a[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=a,n.d=function(e,a,o){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var c in e)n.d(o,c,function(a){return e[a]}.bind(null,c));return o},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="",n(n.s=0)}([function(e,a,n){"use strict";n.r(a);n(1),n(2)},function(e,a){const n=document.createElement("header");n.className="header",document.body.append(n);const o=document.createElement("div");o.className="button-row",n.append(o);const c=document.createElement("div");c.className="button-row__refresh-button",o.append(c);const t=document.createElement("ul");t.className="lang-switcher",o.append(t);const d=new Array(3);for(let e=0;e<3;e+=1)d[e]=document.createElement("li"),d[e].className="lang-switcher__item",t.append(d[e]);d[0].innerHTML="EN",d[1].innerHTML="RU",d[2].innerHTML="BE",d[0].className+=" lang-switcher__item_current";const m=document.createElement("div");m.className="temperature-switcher",o.append(m);const i=document.createElement("div");i.className="temperature-switcher__item",m.append(i),i.innerHTML="°F";const r=document.createElement("div");r.className="temperature-switcher__item temperature-switcher__item_current",m.append(r),r.innerHTML="°С";const s=document.createElement("div");s.className="search-row",n.append(s);const l=document.createElement("input");l.className="search-row__field",l.type="text",l.name="search",l.value="Search city or ZIP",s.append(l);const u=document.createElement("div");u.className="search-row__voice-search",s.append(u);const p=document.createElement("div");p.className="search-row__button",s.append(p),p.innerHTML="Search";const f=document.createElement("main");f.className="main",document.body.append(f);const h=document.createElement("section");h.className="section-1",f.append(h),h.insertAdjacentHTML("afterbegin",'<div class="info"><span class="info__location"></span><span class="info__date"></span></div><div class="main-weather"><span class="main-weather__temperature"></span><ul class="details"><li class="details__item"></li><li class="details__item"></li><li class="details__item"></li><li class="details__item"></li></ul><div class="main-weather__icon"></div></div>'),h.insertAdjacentHTML("beforeend",'<ul class="forecast"><li class="forecast-item"></li><li class="forecast-item"></li><li class="forecast-item"></li></ul>');const M=document.getElementsByClassName("forecast-item");for(let e=0;e<3;e+=1)M[e].insertAdjacentHTML("afterbegin",'<span class="forecast-item__day"></span><span class="forecast-item__temperature"></span><div class="forecast-item__icon"></div>');const S=document.createElement("section");S.className="section-2",f.append(S)},function(e,a,n){const o=document.querySelector(".info__location"),c=document.querySelector(".info__date"),t=document.querySelector(".main-weather__temperature"),d=document.querySelector(".main-weather__icon"),m=document.getElementsByClassName("details__item"),i=document.querySelector("body"),r=document.getElementsByClassName("forecast-item__day"),s=document.getElementsByClassName("forecast-item__temperature"),l=document.getElementsByClassName("forecast-item__icon");let u=new Date;function p(e){let a=e;a>6&&(a-=7);return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][a]}function f(){function e(e){return e<10?`0${e}`:e}var a;return`${p(u.getDay())} ${e(u.getDate())} ${a=u.getMonth(),["January","February","March","April","May","June","July","August","September","October","November","December"][a]} ${e(u.getHours())}:${e(u.getMinutes())}`}c.innerHTML=f();let h=function(){if(u=new Date,console.log("a"),0===u.getSeconds())return c.innerHTML=f(),setInterval(()=>{c.innerHTML=f()},6e4),void(h=null);setTimeout(()=>{h()},950)};h();const{getName:M}=n(3);fetch("https://ipinfo.io/json?token=08f12254167956").then(e=>e.json()).then(e=>{o.innerHTML=`${e.city}, ${M(e.country)}`,sessionStorage.setItem("city",e.city),sessionStorage.setItem("tType"," Celsius"),function(e,a){return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e}&lang=${a}&cnt=24&units=metric&APPID=df773d568696e244bf0864cd6367d9c5`).then(e=>e.json()).then(e=>e.list)}(e.city,"en").then(e=>{sessionStorage.setItem("lang","En");const a=e[0];t.innerHTML=`${Math.round(a.main.temp)}`,d.style.backgroundImage=`url('http://openweathermap.org/img/wn/${a.weather[0].icon}@2x.png')`,m[0].innerHTML=a.weather[0].description,m[1].innerHTML=`feels like: ${Math.round(a.main.feels_like)}°`,m[2].innerHTML=`wind: ${Math.round(a.wind.speed)} m/s`,m[3].innerHTML=`Humidity:  ${Math.round(a.main.humidity)}%`;let n=(24-`${e[0].dt_txt[11]}${e[0].dt_txt[12]}`+12)/3;for(let a=0;a<3;a+=1)r[a].innerHTML=`${p(u.getDay()+a+1)}`,s[a].innerHTML=`${Math.round(e[n].main.temp)}`,l[a].style.backgroundImage=`url('http://openweathermap.org/img/wn/${e[n].weather[0].icon}@2x.png')`,n+=8;(function(e){return fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${e}order_by=popular&client_id=09ade6d49c5651607a93d8183e34f5f6ba29411e9e3ef2388640614d25a3a986`).then(e=>e.json()).then(e=>e.urls.regular)})(`${a.weather[0].main} weather`).then(e=>{i.style.backgroundImage=`linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%),\n        url('${e}')`}).catch(()=>{i.style.backgroundColor="black"})})}),console.log(sessionStorage)},function(e,a,n){"use strict";var o=n(4),c={},t={};function d(e){c[e.name.toLowerCase()]=e.code,t[e.code.toLowerCase()]=e.name}o.forEach(d),a.overwrite=function(e){e&&e.length&&e.forEach((function(e){var a=o.findIndex((function(a){return a.code===e.code}));o[a]=e,d(e)}))},a.getCode=function(e){return c[e.toLowerCase()]},a.getName=function(e){return t[e.toLowerCase()]},a.getNames=function(){return o.map((function(e){return e.name}))},a.getCodes=function(){return o.map((function(e){return e.code}))},a.getCodeList=function(){return t},a.getNameList=function(){return c},a.getData=function(){return o}},function(e){e.exports=JSON.parse('[{"code":"AD","name":"Andorra"},{"code":"AE","name":"United Arab Emirates"},{"code":"AF","name":"Afghanistan"},{"code":"AG","name":"Antigua and Barbuda"},{"code":"AI","name":"Anguilla"},{"code":"AL","name":"Albania"},{"code":"AM","name":"Armenia"},{"code":"AO","name":"Angola"},{"code":"AQ","name":"Antarctica"},{"code":"AR","name":"Argentina"},{"code":"AS","name":"American Samoa"},{"code":"AT","name":"Austria"},{"code":"AU","name":"Australia"},{"code":"AW","name":"Aruba"},{"code":"AX","name":"Åland Islands"},{"code":"AZ","name":"Azerbaijan"},{"code":"BA","name":"Bosnia and Herzegovina"},{"code":"BB","name":"Barbados"},{"code":"BD","name":"Bangladesh"},{"code":"BE","name":"Belgium"},{"code":"BF","name":"Burkina Faso"},{"code":"BG","name":"Bulgaria"},{"code":"BH","name":"Bahrain"},{"code":"BI","name":"Burundi"},{"code":"BJ","name":"Benin"},{"code":"BL","name":"Saint Barthélemy"},{"code":"BM","name":"Bermuda"},{"code":"BN","name":"Brunei Darussalam"},{"code":"BO","name":"Bolivia, Plurinational State of"},{"code":"BQ","name":"Bonaire, Sint Eustatius and Saba"},{"code":"BR","name":"Brazil"},{"code":"BS","name":"Bahamas"},{"code":"BT","name":"Bhutan"},{"code":"BV","name":"Bouvet Island"},{"code":"BW","name":"Botswana"},{"code":"BY","name":"Belarus"},{"code":"BZ","name":"Belize"},{"code":"CA","name":"Canada"},{"code":"CC","name":"Cocos (Keeling) Islands"},{"code":"CD","name":"Congo, Democratic Republic of the"},{"code":"CF","name":"Central African Republic"},{"code":"CG","name":"Congo"},{"code":"CH","name":"Switzerland"},{"code":"CI","name":"Côte d\'Ivoire"},{"code":"CK","name":"Cook Islands"},{"code":"CL","name":"Chile"},{"code":"CM","name":"Cameroon"},{"code":"CN","name":"China"},{"code":"CO","name":"Colombia"},{"code":"CR","name":"Costa Rica"},{"code":"CU","name":"Cuba"},{"code":"CV","name":"Cabo Verde"},{"code":"CW","name":"Curaçao"},{"code":"CX","name":"Christmas Island"},{"code":"CY","name":"Cyprus"},{"code":"CZ","name":"Czechia"},{"code":"DE","name":"Germany"},{"code":"DJ","name":"Djibouti"},{"code":"DK","name":"Denmark"},{"code":"DM","name":"Dominica"},{"code":"DO","name":"Dominican Republic"},{"code":"DZ","name":"Algeria"},{"code":"EC","name":"Ecuador"},{"code":"EE","name":"Estonia"},{"code":"EG","name":"Egypt"},{"code":"EH","name":"Western Sahara"},{"code":"ER","name":"Eritrea"},{"code":"ES","name":"Spain"},{"code":"ET","name":"Ethiopia"},{"code":"FI","name":"Finland"},{"code":"FJ","name":"Fiji"},{"code":"FK","name":"Falkland Islands (Malvinas)"},{"code":"FM","name":"Micronesia, Federated States of"},{"code":"FO","name":"Faroe Islands"},{"code":"FR","name":"France"},{"code":"GA","name":"Gabon"},{"code":"GB","name":"United Kingdom of Great Britain and Northern Ireland"},{"code":"GD","name":"Grenada"},{"code":"GE","name":"Georgia"},{"code":"GF","name":"French Guiana"},{"code":"GG","name":"Guernsey"},{"code":"GH","name":"Ghana"},{"code":"GI","name":"Gibraltar"},{"code":"GL","name":"Greenland"},{"code":"GM","name":"Gambia"},{"code":"GN","name":"Guinea"},{"code":"GP","name":"Guadeloupe"},{"code":"GQ","name":"Equatorial Guinea"},{"code":"GR","name":"Greece"},{"code":"GS","name":"South Georgia and the South Sandwich Islands"},{"code":"GT","name":"Guatemala"},{"code":"GU","name":"Guam"},{"code":"GW","name":"Guinea-Bissau"},{"code":"GY","name":"Guyana"},{"code":"HK","name":"Hong Kong"},{"code":"HM","name":"Heard Island and McDonald Islands"},{"code":"HN","name":"Honduras"},{"code":"HR","name":"Croatia"},{"code":"HT","name":"Haiti"},{"code":"HU","name":"Hungary"},{"code":"ID","name":"Indonesia"},{"code":"IE","name":"Ireland"},{"code":"IL","name":"Israel"},{"code":"IM","name":"Isle of Man"},{"code":"IN","name":"India"},{"code":"IO","name":"British Indian Ocean Territory"},{"code":"IQ","name":"Iraq"},{"code":"IR","name":"Iran, Islamic Republic of"},{"code":"IS","name":"Iceland"},{"code":"IT","name":"Italy"},{"code":"JE","name":"Jersey"},{"code":"JM","name":"Jamaica"},{"code":"JO","name":"Jordan"},{"code":"JP","name":"Japan"},{"code":"KE","name":"Kenya"},{"code":"KG","name":"Kyrgyzstan"},{"code":"KH","name":"Cambodia"},{"code":"KI","name":"Kiribati"},{"code":"KM","name":"Comoros"},{"code":"KN","name":"Saint Kitts and Nevis"},{"code":"KP","name":"Korea, Democratic People\'s Republic of"},{"code":"KR","name":"Korea, Republic of"},{"code":"KW","name":"Kuwait"},{"code":"KY","name":"Cayman Islands"},{"code":"KZ","name":"Kazakhstan"},{"code":"LA","name":"Lao People\'s Democratic Republic"},{"code":"LB","name":"Lebanon"},{"code":"LC","name":"Saint Lucia"},{"code":"LI","name":"Liechtenstein"},{"code":"LK","name":"Sri Lanka"},{"code":"LR","name":"Liberia"},{"code":"LS","name":"Lesotho"},{"code":"LT","name":"Lithuania"},{"code":"LU","name":"Luxembourg"},{"code":"LV","name":"Latvia"},{"code":"LY","name":"Libya"},{"code":"MA","name":"Morocco"},{"code":"MC","name":"Monaco"},{"code":"MD","name":"Moldova, Republic of"},{"code":"ME","name":"Montenegro"},{"code":"MF","name":"Saint Martin, (French part)"},{"code":"MG","name":"Madagascar"},{"code":"MH","name":"Marshall Islands"},{"code":"MK","name":"North Macedonia"},{"code":"ML","name":"Mali"},{"code":"MM","name":"Myanmar"},{"code":"MN","name":"Mongolia"},{"code":"MO","name":"Macao"},{"code":"MP","name":"Northern Mariana Islands"},{"code":"MQ","name":"Martinique"},{"code":"MR","name":"Mauritania"},{"code":"MS","name":"Montserrat"},{"code":"MT","name":"Malta"},{"code":"MU","name":"Mauritius"},{"code":"MV","name":"Maldives"},{"code":"MW","name":"Malawi"},{"code":"MX","name":"Mexico"},{"code":"MY","name":"Malaysia"},{"code":"MZ","name":"Mozambique"},{"code":"NA","name":"Namibia"},{"code":"NC","name":"New Caledonia"},{"code":"NE","name":"Niger"},{"code":"NF","name":"Norfolk Island"},{"code":"NG","name":"Nigeria"},{"code":"NI","name":"Nicaragua"},{"code":"NL","name":"Netherlands"},{"code":"NO","name":"Norway"},{"code":"NP","name":"Nepal"},{"code":"NR","name":"Nauru"},{"code":"NU","name":"Niue"},{"code":"NZ","name":"New Zealand"},{"code":"OM","name":"Oman"},{"code":"PA","name":"Panama"},{"code":"PE","name":"Peru"},{"code":"PF","name":"French Polynesia"},{"code":"PG","name":"Papua New Guinea"},{"code":"PH","name":"Philippines"},{"code":"PK","name":"Pakistan"},{"code":"PL","name":"Poland"},{"code":"PM","name":"Saint Pierre and Miquelon"},{"code":"PN","name":"Pitcairn"},{"code":"PR","name":"Puerto Rico"},{"code":"PS","name":"Palestine, State of"},{"code":"PT","name":"Portugal"},{"code":"PW","name":"Palau"},{"code":"PY","name":"Paraguay"},{"code":"QA","name":"Qatar"},{"code":"RE","name":"Réunion"},{"code":"RO","name":"Romania"},{"code":"RS","name":"Serbia"},{"code":"RU","name":"Russian Federation"},{"code":"RW","name":"Rwanda"},{"code":"SA","name":"Saudi Arabia"},{"code":"SB","name":"Solomon Islands"},{"code":"SC","name":"Seychelles"},{"code":"SD","name":"Sudan"},{"code":"SE","name":"Sweden"},{"code":"SG","name":"Singapore"},{"code":"SH","name":"Saint Helena, Ascension and Tristan da Cunha"},{"code":"SI","name":"Slovenia"},{"code":"SJ","name":"Svalbard and Jan Mayen"},{"code":"SK","name":"Slovakia"},{"code":"SL","name":"Sierra Leone"},{"code":"SM","name":"San Marino"},{"code":"SN","name":"Senegal"},{"code":"SO","name":"Somalia"},{"code":"SR","name":"Suriname"},{"code":"SS","name":"South Sudan"},{"code":"ST","name":"Sao Tome and Principe"},{"code":"SV","name":"El Salvador"},{"code":"SX","name":"Sint Maarten, (Dutch part)"},{"code":"SY","name":"Syrian Arab Republic"},{"code":"SZ","name":"Eswatini"},{"code":"TC","name":"Turks and Caicos Islands"},{"code":"TD","name":"Chad"},{"code":"TF","name":"French Southern Territories"},{"code":"TG","name":"Togo"},{"code":"TH","name":"Thailand"},{"code":"TJ","name":"Tajikistan"},{"code":"TK","name":"Tokelau"},{"code":"TL","name":"Timor-Leste"},{"code":"TM","name":"Turkmenistan"},{"code":"TN","name":"Tunisia"},{"code":"TO","name":"Tonga"},{"code":"TR","name":"Turkey"},{"code":"TT","name":"Trinidad and Tobago"},{"code":"TV","name":"Tuvalu"},{"code":"TW","name":"Taiwan, Province of China"},{"code":"TZ","name":"Tanzania, United Republic of"},{"code":"UA","name":"Ukraine"},{"code":"UG","name":"Uganda"},{"code":"UM","name":"United States Minor Outlying Islands"},{"code":"US","name":"United States of America"},{"code":"UY","name":"Uruguay"},{"code":"UZ","name":"Uzbekistan"},{"code":"VA","name":"Holy See"},{"code":"VC","name":"Saint Vincent and the Grenadines"},{"code":"VE","name":"Venezuela, Bolivarian Republic of"},{"code":"VG","name":"Virgin Islands, British"},{"code":"VI","name":"Virgin Islands, U.S."},{"code":"VN","name":"Viet Nam"},{"code":"VU","name":"Vanuatu"},{"code":"WF","name":"Wallis and Futuna"},{"code":"WS","name":"Samoa"},{"code":"YE","name":"Yemen"},{"code":"YT","name":"Mayotte"},{"code":"ZA","name":"South Africa"},{"code":"ZM","name":"Zambia"},{"code":"ZW","name":"Zimbabwe"}]')}]);
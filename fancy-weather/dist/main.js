!function(e){var t={};function n(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(r,c,function(t){return e[t]}.bind(null,c));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1)},function(e,t){const n=document.createElement("header");n.className="header",document.body.append(n);const r=document.createElement("div");r.className="button-row",n.append(r);const c=document.createElement("div");c.className="button-row__refresh-button",r.append(c);const a=document.createElement("ul");a.className="lang-switcher",r.append(a);const o=new Array(3);for(let e=0;e<3;e+=1)o[e]=document.createElement("li"),o[e].className="lang-switcher__item",a.append(o[e]);o[0].innerHTML="EN",o[1].innerHTML="RU",o[2].innerHTML="BE",o[0].className+=" lang-switcher__item_current";const s=document.createElement("div");s.className="temperature-switcher",r.append(s);const u=document.createElement("div");u.className="temperature-switcher__item",s.append(u),u.innerHTML="°F";const i=document.createElement("div");i.className="temperature-switcher__item temperature-switcher__item_current",s.append(i),i.innerHTML="°С";const l=document.createElement("div");l.className="search-row",n.append(l);const m=document.createElement("input");m.className="search-row__field",m.type="text",m.name="search",m.value="Search city or ZIP",l.append(m);const d=document.createElement("div");d.className="search-row__voice-search",l.append(d);const p=document.createElement("div");p.className="search-row__button",l.append(p),p.innerHTML="Search"}]);
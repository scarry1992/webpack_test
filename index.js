import messTempl from './src/scripts/main'

let element = document.createElement('div');
element.setAttribute('id', 'main');
element.innerHTML = messTempl;
let img = document.createElement('img');
img.src = require('./src/img/elephant.jpg');
window.addEventListener('load', () => {document.body.appendChild(element);document.body.appendChild(img);});
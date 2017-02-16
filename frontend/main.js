import messTempl from '../src/scripts/main';
//import {Hello} from '../src/scripts/welcome';

let element = document.createElement('div');
element.setAttribute('id', 'main');
element.innerHTML = messTempl;
let img = document.createElement('img');
img.src = require('../src/img/elephant.jpg');
window.addEventListener('load', () => {document.body.appendChild(element);document.body.appendChild(img);});
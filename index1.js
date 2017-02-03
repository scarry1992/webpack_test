import messTempl from './src/scripts/main'

let element = document.createElement('div');
element.setAttribute('id', 'main');
element.innerHTML = messTempl;
window.addEventListener('load', () => {document.body.appendChild(element);});
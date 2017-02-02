//import '../style/theme.scss';
import _ from 'lodash';
//import template from '../templates/index.handlebars'
let template = require('../templates/index.handlebars');

window.addEventListener('load', () => {document.getElementById('main').innerHTML = _.isEqual(1,2);});
console.log(template());
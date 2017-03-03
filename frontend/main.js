import messTempl from '../src/scripts/main';
//import {Hello} from '../src/scripts/welcome';

let element = document.createElement('div');
element.setAttribute('id', 'main');
element.innerHTML = messTempl;

let img = document.createElement('img');
img.src = require('../src/img/elephant.jpg');

let buttonLogin = document.createElement('button');
buttonLogin.classList.add('login');
buttonLogin.innerHTML = 'Login';

window.addEventListener('load', () => {
    document.body.appendChild(element);
    document.body.appendChild(img);
    document.body.appendChild(buttonLogin);
    let imgClick = document.querySelector('img');
    imgClick.addEventListener('click', function (e) {
        require.ensure([], function () {
            let print = require('../src/scripts/dynamic');

            print('Misha');
        });
    });


    let button = document.querySelector('button');
    button.addEventListener('click', function (e) {
        let elem = e.target;

        require.ensure([], function (require) {
            //let action = require(`../src/scripts/auth/${elem.classList}`);
            let context = require.context('../src/scripts/auth', false, /^(?!.*\.js$).*/),//расширение не обязательно. но тогда модуль попадет в 2х видах
                action = context(`./${elem.classList}`);

            console.log(context.resolve('./login'), context.keys());

            if (elem.classList.contains('login')) {
                elem.classList.remove('login');
                elem.classList.add('logout');
                elem.innerHTML = 'Logout';
            } else {
                elem.classList.remove('logout');
                elem.classList.add('login');
                elem.innerHTML = 'Login';
            }

            action();
        }, 'auth');//имя для общего модуля для авторизации
    })
});

console.log(_.merge({user:'1'}, {name:'koly'}));
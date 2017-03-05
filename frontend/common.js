// let rout = window.location.pathname.slice(1).split('.')[0],
//     routModule = require('../src/scripts/routing/' + rout);
//
// //routModule((rout) => {rout.default()});
// let link = document.querySelector('.click');
// link.addEventListener('click', (e) => {
//     e.preventDefault();
//     routModule((rout) => {rout.default()});
// });
//
// let moment = require('moment');
//
// let today = moment(new Date()).locale('ru');
//
// console.log(today.calendar());



//import _ from 'lodash';
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

console.log(_.merge({user:'1'}, {name:'koly'}));

class App extends Component {
    render() {
        return (
            <div>Hello</div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
import '../style/theme.scss';
//import _ from 'lodash';
import template from '../templates/message.pug';

module.exports = template({message: 'qweqwe'});

if (NODE_ENV_DEV) {
    console.log(1);
}
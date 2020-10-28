import getDetails from '../data/getDetails';
import cardFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const temp = cardFilms(getDetails);
refs.detailsPage.innerHTML = temp;

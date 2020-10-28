import refs from './refs';
import homePageTpl from '../template/homePage.hbs';
// import 'material-design-icons/iconfont/material-icons.css';

const inputValue = '';

function updateHomeMarkup() {
  const markup = homePageTpl();
  refs.homePage.insertAdjacentHTML('beforeend', markup);
}

function fetchFilms() {}

export default updateHomeMarkup;
// updateHomeMarkup();

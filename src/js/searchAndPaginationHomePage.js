import refs from './refs';
import homePageTpl from '../template/homePage.hbs';
import 'material-design-icons/iconfont/material-icons.css';

// const inputValue = '';
// refs.form = refs.homePage.querySelector('.form-search');

function updateHomeMarkup() {
  const markup = homePageTpl();
  refs.homePage.insertAdjacentHTML('beforeend', markup);
}
updateHomeMarkup();

// refs.form = refs.homePage.querySelector('.form-search');
// const iputRef = document.querySelector('.form-search__input');
// const btnNextRef = document.querySelector('.button-next');
// const btnPrevRef = document.querySelector('.button-prev');

// export default updateHomeMarkup;

const inputValue = '';
let pageNum = 1;
const apiKey = '81f248d3c9154788229a5419bb33091a';

// function () {

// }

// let pageNumber = 1;
// const filmsOnPage = 6;

// function prevPage() {
//   if (pageNumber > 1) {
//     pageNumber--;
//     changePage(pageNumber);
//   }
// }

// function nextPage() {
//   if (pageNumber < numPage()) {
//     pageNumber++;
//     changePage(pageNumber);
//   }
// }

// function changePage(page) {
//   const btnNext = document.querySelector('.button-next');
//   const btnPrev = document.querySelector('.button-prev');
//   const pagination = document.querySelector('.pagination');
//   const pageNum = document.getElementById('page');

//   if (page < 1) page = 1;
//   if (page > numPages()) page = numPages();

//   pageNum.innerHTML = page;
// }

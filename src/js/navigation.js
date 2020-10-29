import footerTemplate from '../template/footer.hbs';
import headerTemplate from '../template/header.hbs';
import refs from './refs';
import 'material-design-icons/iconfont/material-icons.css';
import {showDetails} from './filmDetailsPage';
import {drawQueueFilmList} from './libraryPage'


const selectFilm = {};

const activeHomePage = () => {
    refs.homePage.classList.remove('notActivePage');
    refs.myFilmLibraryPage.classList.add('notActivePage');
    refs.detailsPage.classList.add('notActivePage');
} 

const activeLibraryPage = () => {
    refs.myFilmLibraryPage.classList.remove('notActivePage');
    refs.detailsPage.classList.add('notActivePage');
    refs.homePage.classList.add('notActivePage');
}

const activeDetailsPage = (moviid, itsLibraryFilm) => {
    refs.homePage.classList.add('notActivePage');
    refs.myFilmLibraryPage.classList.add('notActivePage');
    refs.detailsPage.classList.remove('notActivePage');
    showDetails();
}

refs.header.insertAdjacentHTML('afterbegin', headerTemplate());
refs.footer.insertAdjacentHTML('afterbegin', footerTemplate());

refs.linkLogo = refs.header.querySelector('.js-logo');
refs.linkHome = refs.header.querySelector('.js-home');
refs.linkMyLibrary = refs.header.querySelector('.js-myLibrary');

// console.log(refs.linkHome, refs.linkMyLibrary, refs.linkLogo);

refs.linkLogo.addEventListener('click', event => {
    console.log('Слушаем Лого');
    activeDetailsPage()
    // activeHomePage()
  });

refs.linkHome.addEventListener('click', event => {
  console.log('Слушаем Хоме');
  activeHomePage()
});

refs.linkMyLibrary.addEventListener('click', event => {
  console.log('Слушаем Библиотеку');
  activeLibraryPage();
  drawQueueFilmList();
});



export {activeHomePage, selectFilm}
